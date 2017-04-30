import React from 'react';

import auth from '../../utils/auth';

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
                    console.log(authed);
                    this.setState({
                        authed
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        }

        componentWillReceiveProps() {
            auth()
                .then(authed =>
                    this.setState({
                        authed
                    })
                )
                .catch(err => {
                    console.error(err);
                });
        }

        render() {
            const authed = this.state.authed;

            if (!authed) {
                return <div>Checking auth...</div>;
            }

            return <WrappedComponent {...this.props} />;
        }
    };
}
