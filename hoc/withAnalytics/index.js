/* eslint global-require: 0 */

import React from 'react';

// TODO expose file as React component and wrap in a <NoSSR> component
let ReactGA;
let gaInitialised = false;
if (process.browser) {
    ReactGA = require('react-ga'); // eslint-disable-line global-require
}

const GOOGLE_ANALYTICS_UA = 'UA-99023461-1';

export default ComposedComponent => class WithAnalytics extends React.Component {
    constructor(props) {
        super(props);

        if (process.browser && !gaInitialised) {
            gaInitialised = true;
            ReactGA.initialize(GOOGLE_ANALYTICS_UA);
        }
    }

    componentDidMount() {
        const page = window.location.pathname;
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    render() {
        return <ComposedComponent {...this.props} />;
    }
};
