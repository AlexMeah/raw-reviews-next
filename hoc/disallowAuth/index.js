import React from 'react';
import Router from 'next/router';

import auth from '../../utils/auth';
import BasicLayout from '../../layouts/Basic';

export default function withSubscription(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authed: false
            };
        }

        componentDidMount() {
            auth()
                .then(authed => {
                    this.setState({
                        authed
                    });
                })
                .catch(console.error);
        }

        componentWillReceiveProps() {
            auth()
                .then(authed =>
                    this.setState({
                        authed
                    })
                )
                .catch(console.error);
        }

        render() {
            const authed = this.state.authed;

            if (authed) {
                Router.replace('/');
                return null;
            }

            return <WrappedComponent {...this.props} />;
        }
    };
}
