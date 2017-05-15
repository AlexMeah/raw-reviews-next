import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import ReactGA from 'react-ga';

import DisallowAuth from '../hoc/disallowAuth';
import withData from '../hoc/withData';
import config from '../config';

import BasicLayout from '../layouts/Basic';
import Input from '../components/Input';
import Button from '../components/Button';
import P from '../components/P';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
                email: ''
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
                        ReactGA.event({
                            category: 'Register',
                            action: 'Success'
                        });
                        Router.push('/login');
                    })
                    .catch(err => {
                        const error = err.message.replace(
                            'GraphQL error: ',
                            ''
                        );
                        ReactGA.event({
                            category: 'Register',
                            action: 'Failure',
                            label: error
                        });
                        this.setState({
                            signupSuccessful: false,
                            error
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
            <BasicLayout className="tac">
                <Helmet>
                    <title>{`${config.siteName} | Register`}</title>
                </Helmet>

                <h1>Create user</h1>

                <P color="negative" strong className="error">{error}</P>

                <form onSubmit={this.handleSubmission}>
                    <Input
                        label="Username"
                        type="text"
                        required
                        id="username"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <Input
                        label="Password"
                        type="password"
                        required
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <Input
                        label="Email"
                        type="text"
                        required
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />

                    <Button type="submit">Submit</Button>
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
