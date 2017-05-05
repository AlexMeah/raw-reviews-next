import 'isomorphic-fetch';
import React from 'react';
import styled from 'styled-components';

// import BasicLayout from '../../layouts/Basic';

import Item from './Item';
import H3 from '../H3';
import Button from '../Button';

import vars from '../../css/vars';

const Container = styled.div`
    color: ${vars.colors.bodyDark};
`;

const Feed = ({ loading, feed, loadMoreEdits }) => {
    if (loading) {
        return (
            <div className="tac">
                <p>Loading feed...</p>
            </div>
        );
    }

    const feedData = (feed && feed.feed) || [];

    return (
        <Container>
            <div className="row around-xs">
                {feedData.length === 0 && <H3>No posts</H3>}
                {feedData.map(f => <Item key={f.id} {...f} />)}
            </div>

            <div className="tac">
                <Button onClick={loadMoreEdits}>Load More</Button>
            </div>
        </Container>
    );
};

export default Feed;
