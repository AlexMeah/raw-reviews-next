import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import { graphql, compose } from 'react-apollo';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';

import requireAuth from '../../../hoc/requireAuth';
import withData from '../../../hoc/withData';

import { get } from '../../../utils/api';
import upload from '../../../utils/upload';
import extractExif from '../../../utils/extractExif';

import BasicLayout from '../../../layouts/Basic';
import FileInput from '../../../components/FileInput';
import TextArea from '../../../components/TextArea';
import H1 from '../../../components/H1';
import Button from '../../../components/Button';

function isUploading(state) {
    return state.uploading.after && state.uploading.after !== 100;
}

class CreateReEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                before: '',
                after: '',
                raw: '',
                description: '',
                title: '',
                parent: props.url.query.editId,
                beforeExif: {},
                afterExif: {}
            },
            uploading: {
                after: false
            },
            errors: {
                after: false
            }
        };

        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.edit.edit.loading && !this.state.form.before) {
            this.setState({
                form: Object.assign(
                    {},
                    this.state.form,
                    nextProps.data.edit.edit
                )
            });
        }
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
                        ReactGA.event({
                            category: 'Re-Edit',
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
                            category: 'Re-Edit',
                            action: 'Failed',
                            label: error,
                            nonInteraction: true
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
                <Helmet>
                    <title>Create re-edit</title>
                </Helmet>

                <div className="tac">
                    <H1>Create Re-Edit</H1>

                    <div className="error">{error}</div>
                </div>

                <form
                    onSubmit={this.handleSubmission}
                    className="row around-xs"
                >
                    <div className="col-xs-12 tac">
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

                    <div className="col-xs-12 center-xs">
                        <TextArea
                            className="box"
                            label="Description (optional)"
                            type="Input"
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                            placeholder="What did you change?"
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

const createReEditMutation = gql`
  mutation edit_createEdit($before: String!, $raw: String, $after: String!, $title: String!, $description: String, $afterExif: exif, $parent: String!) {
    edit_createEdit(before: $before, raw: $raw, after: $after, title: $title, description: $description, afterExif: $afterExif, parent: $parent) {
        id
    }
  }
`;

const createReEditQuery = gql`
  query edit($editId: String!) {
      edit {
          edit(id: $editId) {
              before
              raw
              title
          }
      }
  }
`;

const CreateReEditWithMutation = compose(
    graphql(createReEditMutation),
    graphql(createReEditQuery, {
        options: props => {
            const query = (props.url && props.url.query) || {};

            return {
                variables: {
                    editId: query.editId || props.editId || null
                }
            };
        }
    })
)(CreateReEdit);

export default requireAuth(withData(CreateReEditWithMutation));
