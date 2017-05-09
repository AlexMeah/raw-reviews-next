import styled from 'styled-components';
import React from 'react';

import Link from '../Link';

const FilterBar = styled.nav`
    margin-bottom: 2rem;
`;

const Filter = styled.div`
    margin-right: 3rem;

    &:last-child {
        margin: 0;
    }
`;

export default ({ order, time, query = {}, pathname = '/', alias = null }) => (
    <FilterBar className="row">
        <Filter className="col">
            <strong>Order by:</strong> <Link
                color="link"
                active={!order || order === 'best'}
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
                active={order === 'latest'}
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
        <Filter className="col">
            <strong>Time:</strong>
            {' '}
            <Link
                color="link"
                active={!time || time === 'all'}
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
                active={time === 'week'}
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
