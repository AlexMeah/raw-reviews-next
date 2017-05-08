import React from 'react';
import Router from 'next/router';

import login from '../../utils/login';
import BasicLayout from '../../layouts/Basic';
import DisallowAuth from '../../hoc/disallowAuth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import P from '../../components/P';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
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
                login(this.state.form)
                    .then(() => {
                        if (Router.query.returnTo) {
                            window.location = decodeURIComponent(
                                Router.query.returnTo
                            ); // Router push is flaky
                        } else {
                            Router.push('/');
                        }
                    })
                    .catch(err => {
                        this.setState({
                            loginSuccessful: false,
                            error: err.message
                        });
                    });
            }
        );
    }

    render() {
        const { username, password } = this.state.form;

        const { loginSuccessful, error } = this.state;

        if (loginSuccessful) {
            return (
                <BasicLayout>
                    login Successful
                </BasicLayout>
            );
        }

        return (
            <BasicLayout className="tac">
                <h1>Login</h1>

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

                    <Button type="submit">Submit</Button>
                </form>
            </BasicLayout>
        );
    }
}

export default DisallowAuth(Login);
