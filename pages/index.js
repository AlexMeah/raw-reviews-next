import React from 'react';
import Helmet from 'react-helmet';

import BasicLayout from '../layouts/Basic';
import Feed from '../components/Feed';
import FilterBar from '../components/FilterBar';
import Ad from '../components/Ad';

import withData from '../hoc/withData';
import FeedData from '../queries/feed';
import config from '../config';

const Index = props => (
    <BasicLayout>
        <Helmet>
            <title>{`${config.siteName} | Home`}</title>
        </Helmet>
        <FilterBar {...props.url.query} />
        <Ad slot={3129031971} />
        <Feed key="home-feed" {...props} />
    </BasicLayout>
);

export default withData(FeedData(Index));
