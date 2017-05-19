import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import requireAuth from '../../hoc/requireAuth';
import withData from '../../hoc/withData';

import { get } from '../../utils/api';
import upload from '../../utils/upload';
import extractExif from '../../utils/extractExif';
import config from '../../config';

import TagInput from '../../components/TagInput';
import BasicLayout from '../../layouts/Basic';
import FileInput from '../../components/FileInput';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import H1 from '../../components/H1';
import Button from '../../components/Button';

function isUploading(state) {
    return (
        (state.uploading.before && state.uploading.before !== 100) ||
        (state.uploading.after && state.uploading.after !== 100) ||
        (state.uploading.raw && state.uploading.raw !== 100)
    );
}

class CreateEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                before: '',
                after: '',
                raw: '',
                description: '',
                title: '',
                beforeExif: {},
                afterExif: {},
                tags: []
            },
            uploading: {
                before: false,
                after: false,
                raw: false
            },
            errors: {
                before: false,
                after: false,
                raw: false
            }
        };

        this.handleFile = this.handleFile.bind(this);
        this._onTagsChange = this._onTagsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    handleChange(e) {
        this.setState({
            form: Object.assign(this.state.form, {
                [e.target.name]: e.target.value
            })
        });
    }

    _onTagsChange(tags) {
        this.setState({
            form: Object.assign(this.state.form, {
                tags
            })
        });
    }

    handleFile(e) {
        const file = e.target.files[0];
        const name = e.target.name;

        this.setState({
            uploading: Object.assign({}, this.state.uploading, {
                [name]: 0
            })
        });

        Promise.all([
            get(
                `/api/sign?file-type=${file.type}&file-name=${file.name}&field=${name}`
            ).then(
                upload(file, percent => {
                    this.setState({
                        uploading: Object.assign({}, this.state.uploading, {
                            [name]: percent
                        })
                    });
                })
            ),
            extractExif(file).catch(() => null)
        ])
            .then(([url, exif]) => {
                this.setState({
                    form: Object.assign({}, this.state.form, {
                        [name]: url,
                        [`${name}Exif`]: exif
                    }),
                    errors: Object.assign({}, this.state.errors, {
                        [name]: false
                    })
                });
            })
            .catch(err => {
                this.setState({
                    errors: Object.assign({}, this.state.errors, {
                        [name]: err.message
                    })
                });
            });
    }

    handleSubmission(e) {
        e.preventDefault();

        this.setState(
            {
                error: null
            },
            () => {
                this.props
                    .mutate({
                        variables: this.state.form
                    })
                    .then(({ data: { edit_createEdit: { id } } }) => {
                        ReactGA.event({
                            category: 'Edit',
                            action: 'Submitted',
                            label: id
                        });
                        Router.push(`/e/view?editId=${id}`, `/e/${id}`);
                    })
                    .catch(err => {
                        const error = err.message.replace(
                            'GraphQL error: ',
                            ''
                        );

                        this.setState({
                            editCreateSuccessful: false,
                            error
                        });
                        ReactGA.event({
                            category: 'Edit',
                            action: 'Failed',
                            label: error,
                            nonInteraction: true
                        });
                    });
            }
        );
    }

    render() {
        const { error } = this.state;
        const hasErrors = Object.keys(this.state.errors)
            .map(k => this.state.errors[k])
            .find(e => e);

        return (
            <BasicLayout>
                <Helmet>
                    <title>{`${config.siteName} | Create Edit`}</title>
                </Helmet>

                <div className="tac">
                    <H1>Create Edit</H1>

                    <div className="error">{error}</div>
                </div>

                <form
                    onSubmit={this.handleSubmission}
                    className="row around-xs"
                >
                    <div className="col-xs-12 col-md-4 tac">
                        <FileInput
                            className="box"
                            label="Before"
                            progress={this.state.uploading.before}
                            error={this.state.errors.before}
                            accept="image/jpeg"
                            type="file"
                            name="before"
                            id="before"
                            required
                            onChange={this.handleFile}
                            info="Max 5mb"
                        />
                    </div>
                    <div className="col-xs-12 col-md-4 tac">
                        <FileInput
                            className="box"
                            label="After"
                            progress={this.state.uploading.after}
                            error={this.state.errors.after}
                            accept="image/jpeg"
                            type="file"
                            name="after"
                            id="after"
                            required
                            onChange={this.handleFile}
                            info="Max 5mb"
                        />
                    </div>
                    <div className="col-xs-12 col-md-4 tac">
                        <FileInput
                            className="box"
                            label="Raw (optional)"
                            progress={this.state.uploading.raw}
                            error={this.state.errors.raw}
                            type="file"
                            id="raw"
                            name="raw"
                            onChange={this.handleFile}
                            info="Max 80mb"
                        />
                    </div>

                    <div className="col-xs-12 center-xs">
                        <Input
                            className="box"
                            label="Title"
                            type="Input"
                            required
                            id="title"
                            name="title"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="col-xs-12 center-xs">
                        <TextArea
                            className="box"
                            label="Description (optional)"
                            type="Input"
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                            placeholder="What did you do?"
                        />
                    </div>

                    <div className="col-xs-12 center-xs">
                        <TagInput
                            onChange={this._onTagsChange}
                            value={this.state.form.tags}
                        />
                    </div>

                    <div className="col-xs-12 center-xs">
                        <div className="box">
                            <Button
                                type="submit"
                                disabled={hasErrors || isUploading(this.state)}
                                color={hasErrors ? 'negative' : 'positive'}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </BasicLayout>
        );
    }
}

const createEditMutation = gql`
  mutation edit_createEdit($before: String!, $raw: String, $after: String!, $title: String!, $description: String, $tags: [String], $beforeExif: exif, $afterExif: exif) {
    edit_createEdit(before: $before, raw: $raw, after: $after, title: $title, description: $description, tags: $tags, beforeExif: $beforeExif, afterExif: $afterExif) {
        id,
        userId
    }
  }
`;

const CreateEditWithMutation = graphql(createEditMutation)(CreateEdit);

export default requireAuth(withData(CreateEditWithMutation));
