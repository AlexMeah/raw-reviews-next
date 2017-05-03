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

export default ({ order, time }) => (
    <FilterBar>
        <Filter>
            <strong>Order:</strong> <Link
                color="link"
                active={order === 'best'}
                href={{
                    query: {
                        order: 'best',
                        time
                    }
                }}
            >
                    Best
                </Link> | <Link
                    color="link"
                    active={!order || order === 'latest'}
                    href={{
                        query: {
                            order: 'latest',
                            time
                        }
                    }}
                >
                    Latest
                </Link>
        </Filter>
        <Filter>
            <strong title="limited to last 10,000 posts">Time:</strong>
            {' '}
            <Link
                color="link"
                active={time === 'all'}
                href={{
                    query: {
                        time: 'all',
                        order
                    }
                }}
            >
                    All
                </Link> | <Link
                    color="link"
                    active={time === 'year'}
                    href={{
                        query: {
                            time: 'year',
                            order
                        }
                    }}
                >
                    Year
                </Link> | <Link
                    color="link"
                    active={time === 'month'}
                    href={{
                        query: {
                            time: 'month',
                            order
                        }
                    }}
                >
                    Month
                </Link> | <Link
                    color="link"
                    active={!time || time === 'week'}
                    href={{
                        query: {
                            time: 'week',
                            order
                        }
                    }}
                >
                    Week
                </Link> | <Link
                    color="link"
                    active={time === 'day'}
                    href={{
                        query: {
                            time: 'day',
                            order
                        }
                    }}
                >
                    Day
                </Link> | <Link
                    color="link"
                    active={time === 'hour'}
                    href={{
                        query: {
                            time: 'hour',
                            order
                        }
                    }}
                >
                    Hour
                </Link>
        </Filter>
    </FilterBar>
    );
