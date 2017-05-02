import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Vote from '../Vote';
import Image from './Image';
import Card from '../Card';
import P from '../P';
import H3 from '../H3';
import Link from '../Link';

const Container = styled(Card)`
    margin-bottom: 4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Left = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    > *:nth-child(1) {
        align-self: center;
        margin-right: 2rem;
    }

    > *:nth-child(2) {
        flex: 1 0 0;
    }
`;

const Right = styled.div`
    flex: 1;
    padding-left: 2rem;
    align-self: center;
`;

const Item = ({
    id,
    ups,
    downs,
    userVote,
    after,
    before,
    description,
    createdAt,
    userId
}) => (
    <Container>
        <Left>
            <Vote id={id} ups={ups} downs={downs} userVote={userVote} />
            <Link href={`/e/view?editId=${id}`} as={`/e/${id}`}>
                <Image before={before} after={after} />
            </Link>
        </Left>
        <Right>
            <Link href={`/e/view?editId=${id}`} as={`/e/${id}`}>
                <H3 color="secondary">{description}</H3>
            </Link>
            <P color="bodyDark">
                Submitted
                {' '}
                <strong>{distanceInWordsToNow(createdAt)}</strong>
                {' '}
                ago by
                {' '}
                <strong>
                    <Link
                        href={`/u/profile?userId=${userId}`}
                        as={`/u/${userId}`}
                    >
                        {userId}
                    </Link>
                </strong>
            </P>
        </Right>
    </Container>
);

export default Item;
