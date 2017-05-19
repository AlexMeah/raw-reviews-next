import styled from 'styled-components';
import React from 'react';
import ReactGA from 'react-ga';

import Link from '../Link';

const FilterBar = styled.nav`
    margin-bottom: 2rem;
`;

const Filter = styled.div`
    margin-right: 3rem;
    display: inline-block;

    &:last-child {
        margin: 0;
    }
`;

const track = val => () => {
    ReactGA.event({
        category: 'Filter Bar',
        action: 'Click',
        label: val
    });
};

export default ({ order, time, query = {}, pathname = '/', alias = null }) => (
    <FilterBar className="row">
        <div className="col-xs-12">
            <Filter className="col">
                <strong>Order by:</strong> <Link
                    color="link"
                    active={!order || order === 'hot'}
                    href={{
                        pathname,
                        query: Object.assign(
                            {
                                order: 'hot',
                                time
                            },
                            query
                        )
                    }}
                    as={alias}
                    onClick={track('hot')}
                >
                    Hot
                </Link> | <Link
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
                    onClick={track('best')}
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
                    onClick={track('latest')}
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
                    onClick={track('all')}
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
                    onClick={track('year')}
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
                    onClick={track('month')}
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
                    onClick={track('week')}
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
                    onClick={track('day')}
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
                    onClick={track('hour')}
                >
                    Hour
                </Link>
            </Filter>
        </div>
    </FilterBar>
);
