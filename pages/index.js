import React from 'react';

import BasicLayout from '../layouts/Basic';
import Feed from '../components/Feed';
import FilterBar from '../components/FilterBar';

import withData from '../hoc/withData';
import FeedData from '../queries/feed';

const Index = props => (
    <BasicLayout>
        <FilterBar {...props.url.query} />
        <Feed key="home-feed" {...props} />
    </BasicLayout>
);

export default withData(FeedData(Index));
