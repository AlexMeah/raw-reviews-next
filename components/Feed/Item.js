import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import HeartIcon from 'react-icons/lib/fa/heart-o';

import styleVars from '../../css/vars';

import Image from './Image';
import P from '../P';
import H3 from '../H3';
import Link from '../Link';

const Container = styled.div`
    margin-bottom: 4rem;
    width: 100%;
    max-width: 26rem;
`;

const Top = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`;

const Bottom = styled.div``;

const SmallH3 = styled(H3)`
    font-size: 1.8rem;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
`;

const Likes = styled.div`
    margin-top: 1rem;
    color: ${styleVars.colors.body};

    > span {
        vertical-align: middle;
        line-height: 1;
        margin-left: 1rem;
    }
`;

const Item = ({
    id,
    ups,
    downs,
    after,
    before,
    title,
    parent,
    createdAt,
    userId
}) => (
    <Container className="col">
        <Top>
            <Link href={`/e/view?editId=${id}`} as={`/e/${id}`}>
                <Image before={before} after={after} />
            </Link>
        </Top>
        <Bottom>
            <Link href={`/e/view?editId=${id}`} as={`/e/${id}`}>
                <SmallH3 title={title} color="secondary">{title}</SmallH3>
            </Link>
            <P mb0 color="body">
                <small>
                    {parent ? 'Re-Edited' : 'Submitted'}
                    {' '}
                    <strong>{distanceInWordsToNow(createdAt)}</strong>
                    {' '}
                    ago by
                    {' '}
                    <strong>
                        {!userId
                            ? 'anon'
                            : <Link
                                href={`/u/profile?userId=${userId}`}
                                as={`/u/${userId}`}
                            >
                                {userId}
                            </Link>}
                    </strong>
                </small>
            </P>
            <Likes><HeartIcon /> <span>{ups - downs}</span></Likes>
        </Bottom>
    </Container>
);

export default Item;
