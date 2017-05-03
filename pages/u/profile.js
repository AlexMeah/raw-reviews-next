import 'isomorphic-fetch';

import React from 'react';

import withData from '../../hoc/withData';

import BasicLayout from '../../layouts/Basic';
import Feed from '../../components/Feed';
import FilterBar from '../../components/FilterBar';

const Post = props => (
    <BasicLayout>
        <FilterBar
            {...props.url.query}
            pathname="/u/profile"
            query={{ userId: props.url.query.userId }}
            alias={`/u/${props.url.query.userId}`}
        />
        <Feed {...props} />
    </BasicLayout>
);

export default withData(Post);
