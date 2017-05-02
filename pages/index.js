import React from 'react';

import BasicLayout from '../layouts/Basic';
import Feed from '../components/Feed';
import FilterBar from '../components/FilterBar';

import withData from '../hoc/withData';

const Index = props => (
    <BasicLayout>
        <FilterBar {...props.url.query} />
        <Feed {...props} />
    </BasicLayout>
);

export default withData(Index);
