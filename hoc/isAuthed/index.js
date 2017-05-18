import React from 'react';

const isLoggedIn = req =>
    typeof window !== 'undefined'
        ? window.localStorage.getItem('authtoken')
        : req.cookies.authtoken;

export default function withSubscription(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authed: false
            };
        }

        static async getInitialProps({ req }) {
            return {
                loggedIn: isLoggedIn(req)
            };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
