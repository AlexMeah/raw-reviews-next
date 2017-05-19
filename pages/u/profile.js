import React from 'react';
import Helmet from 'react-helmet';

import withData from '../../hoc/withData';
import config from '../../config';

import BasicLayout from '../../layouts/Basic';
import Feed from '../../components/Feed';
import FilterBar from '../../components/FilterBar';
import FeedData from '../../queries/feed';

const User = props => (
    <BasicLayout>
        <Helmet>
            <title>{`${config.siteName} | User Profile`}</title>
        </Helmet>
        <FilterBar
            {...props.url.query}
            pathname="/u/profile"
            query={props.url.query}
            alias={`/u/${props.url.query.userId}`}
        />
        <Feed key={`feed-${props.url.query.userId}`} {...props} />
    </BasicLayout>
);

export default withData(FeedData(User));
