import React from 'react';
import Router from 'next/router';

import login from '../../utils/login';
import BasicLayout from '../../layouts/Basic';
import DisallowAuth from '../../hoc/disallowAuth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: 'alexmeah',
                password: '123456'
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
                            Router.push(
                                decodeURIComponent(Router.query.returnTo)
                            );
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
            <BasicLayout>
                <h1>Login</h1>

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
                    <button type="submit">Submit</button>
                </form>
            </BasicLayout>
        );
    }
}

export default DisallowAuth(Login);
