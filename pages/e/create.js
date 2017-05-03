import React from 'react';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import requireAuth from '../../hoc/requireAuth';
import withData from '../../hoc/withData';

import { get } from '../../utils/api';
import upload from '../../utils/upload';
import extractExif from '../../utils/extractExif';

import BasicLayout from '../../layouts/Basic';
import FileInput from '../../components/FileInput';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import H1 from '../../components/H1';
import Button from '../../components/Button';

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
                afterExif: {}
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
            extractExif(file)
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
                console.log(err);
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
                        Router.push(`/e/view?editId=${id}`, `/e/${id}`);
                    })
                    .catch(err => {
                        this.setState({
                            editCreateSuccessful: false,
                            error: err.message.replace('GraphQL error: ', '')
                        });
                    });
            }
        );
    }

    render() {
        const { before, after, raw, description } = this.state.form;

        const { error } = this.state;
        const hasErrors = Object.keys(this.state.errors)
            .map(k => this.state.errors[k])
            .find(e => e);

        return (
            <BasicLayout>
                <div className="tac">
                    <H1>Create Edit</H1>

                    <div className="error">{error}</div>
                </div>

                <form
                    onSubmit={this.handleSubmission}
                    className="row around-xs"
                >
                    <div className="col-sm-4 tac">
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
                        />
                    </div>
                    <div className="col-sm-4 tac">
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
                        />
                    </div>
                    <div className="col-sm-4 tac">
                        <FileInput
                            className="box"
                            label="Raw (optional)"
                            progress={this.state.uploading.raw}
                            error={this.state.errors.raw}
                            type="file"
                            id="raw"
                            name="raw"
                            onChange={this.handleFile}
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
                        />
                    </div>

                    <div className="col-xs-12 center-xs">
                        <div className="box">
                            <Button
                                type="submit"
                                disabled={hasErrors}
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
  mutation edit_createEdit($before: String!, $raw: String!, $after: String!, $title: String!, $description: String!, $beforeExif: exif, $afterExif: exif) {
    edit_createEdit(before: $before, raw: $raw, after: $after, title: $title, description: $description, beforeExif: $beforeExif, afterExif: $afterExif) {
        id,
        userId
    }
  }
`;

const CreateEditWithMutation = graphql(createEditMutation)(CreateEdit);

export default requireAuth(withData(CreateEditWithMutation));
