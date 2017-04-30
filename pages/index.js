import 'isomorphic-fetch';

import React from 'react';
import Link from 'next/link';

import BasicLayout from '../layouts/Basic';

const Index = props => (
    <BasicLayout>
        <h1>Batman Movies</h1>
        <ul>
            {props.movies.map(movie => (
                <li key={movie.imdbID}>
                    <Link
                        as={`/u/${movie.imdbID}`}
                        href={`/user?id=${movie.imdbID}`}
                    >
                        <a>{movie.Title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </BasicLayout>
);

Index.getInitialProps = async function () {
    const res = await fetch('http://www.omdbapi.com/?s=batman');
    const data = await res.json();

    console.log(`Movie data fetched. Count: ${data.Search.length}`);

    return {
        movies: data.Search
    };
};

export default Index;
