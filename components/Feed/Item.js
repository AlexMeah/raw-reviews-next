import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import HeartIcon from 'react-icons/lib/fa/heart-o';

import styleVars from '../../css/vars';

import Image from './Image';
import P from '../P';
import H2 from '../H2';
import Link from '../Link';

const Container = styled.div`
    padding-bottom: 2rem;
    width: 100%;

@media only screen and (min-width: ${styleVars.breakpoints.sm}) {
    padding: 2rem;
}
`;

const Inner = styled.div`
    height: 100%;
    background: #fff;
    border-radius: ${styleVars.radius};
    box-shadow: ${styleVars.shadow};
    padding: 0;
`;

const Top = styled.div`
    width: 100%;
`;

const Bottom = styled.div`
    padding: 3rem;
    text-align: center;
`;

const SmallH2 = styled(H2)`
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
    <Container className="col-sm-6 col-md-4 col-lg-3">
        <Inner>
            <Top>
                <Link href={`/e/view?editId=${id}`} as={`/e/${id}`}>
                    <Image before={before} after={after} />
                </Link>
            </Top>
            <Bottom>
                <Link href={`/e/view?editId=${id}`} as={`/e/${id}`}>
                    <SmallH2 title={title} color="primary">{title}</SmallH2>
                </Link>
                <hr className="short" />
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
                                      color="primary"
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
        </Inner>
    </Container>
);

export default Item;
