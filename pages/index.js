import React from 'react';
import Helmet from 'react-helmet';

import BasicLayout from '../layouts/Basic';
import Feed from '../components/Feed';
import FilterBar from '../components/FilterBar';
import Ad from '../components/Ad';
import Welcome from '../components/Welcome';

import withData from '../hoc/withData';
import FeedData from '../queries/feed';
import config from '../config';

const Index = props => (
    <BasicLayout>
        <Helmet>
            <title>{`${config.siteName} | Home`}</title>
            <meta
                name="description"
                content="Share your edits, post before and after pics and practice your editing with re-edits."
            />
        </Helmet>
        <Welcome />
        <FilterBar {...props.url.query} />
        <Ad slot={3129031971} />
        <Feed key="home-feed" {...props} />
    </BasicLayout>
);

export default withData(FeedData(Index));
