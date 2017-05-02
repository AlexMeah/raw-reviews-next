import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DisallowAuth from '../../hoc/disallowAuth';
import withData from '../../hoc/withData';

import BasicLayout from '../../layouts/Basic';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: 'dsss',
                password: 'b',
                email: 'a@a.com'
            }
        };

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
        const { username, password, email } = this.state.form;

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
                <h1>Create user</h1>

                <div className="error">{error}</div>

                <form onSubmit={this.handleSubmission}>
                    <label htmlFor="username">
                        <h3>Username</h3>
                        <input
                            type="text"
                            required
                            id="username"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="password">
                        <h3>Password</h3>
                        <input
                            type="text"
                            required
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="email">
                        <h3>Email</h3>
                        <input
                            type="email"
                            required
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </BasicLayout>
        );
    }
}

const createUserMutation = gql`
  mutation user_createUser($username: String!, $email: String!, $password: String!) {
    user_createUser(username: $username, email: $email, password: $password) {
        id
    }
  }
`;

const CreateUserWithMutation = graphql(createUserMutation)(CreateUser);

export default DisallowAuth(withData(CreateUserWithMutation));
