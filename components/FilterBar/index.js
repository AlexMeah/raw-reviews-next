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

const timeLinks = [
    {
        default: true,
        name: 'all',
        text: 'All'
    },
    {
        default: false,
        name: 'year',
        text: 'Year'
    },
    {
        default: false,
        name: 'month',
        text: 'Month'
    },
    {
        default: false,
        name: 'week',
        text: 'Week'
    },
    {
        default: false,
        name: 'day',
        text: 'Day'
    },
    {
        default: false,
        name: 'hour',
        text: 'Hour'
    }
];

const orderLinks = [
    {
        default: true,
        name: 'hot',
        text: 'Hot'
    },
    {
        default: false,
        name: 'best',
        text: 'Best'
    },
    {
        default: false,
        name: 'latest',
        text: 'Latest'
    }
];

const makeOrderLinks = (pathname, alias, query) =>
    orderLinks.map((link, i) => (
        <span key={link.name}>
            <Link
                color="link"
                active={
                    (!query.order && link.default) || query.order === link.name
                }
                href={{
                    pathname,
                    query: {
                        order: link.name,
                        time: query.time,
                        userId: query.userId
                    }
                }}
                as={{
                    pathname: alias,
                    query: {
                        order: link.name,
                        time: query.time
                    }
                }}
                onClick={track(link.name)}
            >
                {link.text}
            </Link> {i < orderLinks.length - 1 && ' | '}
        </span>
    ));

const makeTimeLinks = (pathname, alias, query) =>
    timeLinks.map((link, i) => (
        <span key={link.name}>
            <Link
                color="link"
                active={
                    (!query.time && link.default) || query.time === link.name
                }
                href={{
                    pathname,
                    query: {
                        order: query.order,
                        time: link.name,
                        userId: query.userId
                    }
                }}
                as={{
                    pathname: alias,
                    query: {
                        order: query.order,
                        time: link.name
                    }
                }}
                onClick={track(link.name)}
            >
                {link.text}
            </Link> {i < timeLinks.length - 1 && ' | '}
        </span>
    ));

export default ({ query = {}, pathname = '/', alias = null }) => (
    <FilterBar className="row">
        <div className="col-xs-12">
            <Filter className="col">
                <strong>Order by:</strong>
                {' '}
                {makeOrderLinks(pathname, alias, query)}
            </Filter>
            <Filter className="col">
                <strong>Time:</strong>
                {' '}
                {makeTimeLinks(pathname, alias, query)}
            </Filter>
        </div>
    </FilterBar>
);
