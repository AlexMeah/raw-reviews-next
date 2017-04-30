import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import requireAuth from '../../hoc/requireAuth';
import withData from '../../hoc/withData';

import { get } from '../../utils/api';
import upload from '../../utils/upload';

import BasicLayout from '../../layouts/Basic';

class CreateEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                before: '',
                after: '',
                raw: '',
                description: ''
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

        get(
            `/api/sign?file-type=${file.type}&file-name=${file.name}&field=${name}`
        )
            .then(
                upload(file, percent => {
                    this.setState({
                        uploading: Object.assign({}, this.state.uploading, {
                            [name]: percent
                        })
                    });
                })
            )
            .then(url => {
                this.setState({
                    form: Object.assign({}, this.state.form, {
                        [name]: url
                    }),
                    uploading: Object.assign({}, this.state.uploading, {
                        [name]: false
                    }),
                    errors: Object.assign({}, this.state.uploading, {
                        [name]: false
                    })
                });
            })
            .catch(err => {
                this.setState({
                    errors: Object.assign({}, this.state.errors, {
                        [name]: err.message
                    }),
                    uploading: Object.assign({}, this.state.uploading, {
                        [name]: false
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
                    .then(() => {
                        this.setState({
                            signupSuccessful: true
                        });
                    })
                    .catch(err => {
                        this.setState({
                            signupSuccessful: false,
                            error: err.message.replace('GraphQL error: ', '')
                        });
                    });
            }
        );
    }

    render() {
        const { before, after, raw, description } = this.state.form;

        const { signupSuccessful, error } = this.state;

        if (signupSuccessful) {
            return (
                <div>
                    Signup Successful
                </div>
            );
        }

        return (
            <BasicLayout>
                <h1>Create Edit</h1>

                <div className="error">{error}</div>

                <form onSubmit={this.handleSubmission}>
                    <label htmlFor="before">
                        <h3>before</h3>

                        {this.state.uploading.before &&
                            <p>
                                Uploading before image
                                {' '}
                                {this.state.uploading.before}
                                % ...
                            </p>}
                        {this.state.form.before && <p>Uploaded!</p>}
                        {this.state.errors.before &&
                            <p>{this.state.errors.before}</p>}

                        <input
                            accept="image/jpeg"
                            type="file"
                            required
                            id="before"
                            name="before"
                            onChange={this.handleFile}
                        />
                    </label>
                    <label htmlFor="after">
                        <h3>after</h3>

                        {this.state.uploading.after &&
                            <p>
                                Uploading after image
                                {' '}
                                {this.state.uploading.after}
                                % ...
                            </p>}
                        {this.state.form.after && <p>Uploaded!</p>}
                        {this.state.errors.after &&
                            <p>{this.state.errors.after}</p>}

                        <input
                            accept="image/jpeg"
                            type="file"
                            required
                            id="after"
                            name="after"
                            onChange={this.handleFile}
                        />
                    </label>
                    <label htmlFor="raw">
                        <h3>raw</h3>
                        {this.state.uploading.raw &&
                            <p>
                                Uploading raw image
                                {' '}
                                {this.state.uploading.raw}
                                % ...
                            </p>}
                        {this.state.form.raw && <p>Uploaded!</p>}
                        {this.state.errors.raw &&
                            <p>{this.state.errors.raw}</p>}
                        <input
                            type="file"
                            required
                            id="raw"
                            name="raw"
                            onChange={this.handleFile}
                        />
                    </label>
                    <label htmlFor="description">
                        <h3>description</h3>
                        <p>{this.state.form.description}</p>
                        <input
                            type="textarea"
                            required
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </BasicLayout>
        );
    }
}

const createEditMutation = gql`
  mutation edit_createEdit($before: String!, $raw: String!, $after: String!, $description: String!) {
    edit_createEdit(before: $before, raw: $raw, after: $after, description: $description) {
        id,
        userId,
        url
    }
  }
`;

const CreateEditWithMutation = graphql(createEditMutation)(CreateEdit);

export default requireAuth(withData(CreateEditWithMutation));
