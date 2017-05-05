import styled from 'styled-components';
import React from 'react';

import Link from '../Link';

const FilterBar = styled.nav`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

const Filter = styled.div`
    margin-right: 1rem;

    &:last-child {
        margin: 0;
    }
`;

export default ({ order, time, query = {}, pathname = '/', alias = null }) => (
    <FilterBar>
        <Filter>
            <strong>Order:</strong> <Link
                color="link"
                active={order === 'best'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            order: 'best',
                            time
                        },
                        query
                    )
                }}
                as={alias}
            >
                Best
            </Link> | <Link
                color="link"
                active={!order || order === 'latest'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            order: 'latest',
                            time
                        },
                        query
                    )
                }}
                as={alias}
            >
                Latest
            </Link>
        </Filter>
        <Filter>
            <strong>Time:</strong>
            {' '}
            <Link
                color="link"
                active={time === 'all'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            time: 'all',
                            order
                        },
                        query
                    )
                }}
                as={alias}
            >
                All
            </Link> | <Link
                color="link"
                active={time === 'year'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            time: 'year',
                            order
                        },
                        query
                    )
                }}
                as={alias}
            >
                Year
            </Link> | <Link
                color="link"
                active={time === 'month'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            time: 'month',
                            order
                        },
                        query
                    )
                }}
                as={alias}
            >
                Month
            </Link> | <Link
                color="link"
                active={!time || time === 'week'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            time: 'week',
                            order
                        },
                        query
                    )
                }}
                as={alias}
            >
                Week
            </Link> | <Link
                color="link"
                active={time === 'day'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            time: 'day',
                            order
                        },
                        query
                    )
                }}
                as={alias}
            >
                Day
            </Link> | <Link
                color="link"
                active={time === 'hour'}
                href={{
                    pathname,
                    query: Object.assign(
                        {
                            time: 'hour',
                            order
                        },
                        query
                    )
                }}
                as={alias}
            >
                Hour
            </Link>
        </Filter>
    </FilterBar>
);
