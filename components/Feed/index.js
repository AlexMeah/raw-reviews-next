import 'isomorphic-fetch';
import { gql, graphql } from 'react-apollo';
import React from 'react';
import styled from 'styled-components';

// import BasicLayout from '../../layouts/Basic';

import Item from './Item';
import H3 from '../H3';

import vars from '../../css/vars';

const Container = styled.div`
    color: ${vars.colors.bodyDark};
`;

const Feed = props => {
    if (props.data && props.data.loading) {
        return <p>Loading feed...</p>;
    }

    const feed = props.data.feed.feed;
    const votes = props.data.vote.votes;

    return (
        <Container>
            {feed.length === 0 && <H3>No posts</H3>}
            {feed.map(f => (
                <Item
                    key={f.id}
                    {...f}
                    userVote={(votes.find(v => v.editId === f.id) || {}).vote}
                />
            ))}
        </Container>
    );
};

const feedQuery = gql`
  query feed($order: order, $time: time, $userId: String) {
    feed {
        feed(order: $order, time: $time, userId: $userId) {
            id,
            before,
            after,
            createdAt,
            title,
            ups,
            downs,
            score,
            userId,
            parent
        }
    }
    vote {
        votes {
            id,
            vote,
            editId
        }
    }
  }
`;

export default graphql(feedQuery, {
    options: props => {
        const query = (props.url && props.url.query) || {};

        return {
            fetchPolicy: 'network-only',
            variables: {
                order: query.order || props.order || 'latest',
                time: query.time || props.time || 'week',
                userId: query.userId || props.userId || null
            }
        };
    }
})(Feed);
