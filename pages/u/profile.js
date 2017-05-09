import React from 'react';
import Helmet from 'react-helmet';

import withData from '../../hoc/withData';

import BasicLayout from '../../layouts/Basic';
import Feed from '../../components/Feed';
import FilterBar from '../../components/FilterBar';
import FeedData from '../../queries/feed';

const User = props => (
    <BasicLayout>
        <Helmet>
            <title>User Profile</title>
        </Helmet>
        <FilterBar
            {...props.url.query}
            pathname="/u/profile"
            query={{ userId: props.url.query.userId }}
            alias={`/u/${props.url.query.userId}`}
        />
        <Feed key={`feed-${props.url.query.userId}`} {...props} />
    </BasicLayout>
);

export default withData(FeedData(User));
