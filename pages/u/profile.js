import 'isomorphic-fetch';

import React from 'react';

import BasicLayout from '../../layouts/Basic';

const Post = props => (
    <BasicLayout>
        <h1>{props.movie.Title}</h1>
        <p>{props.movie.Plot}</p>
        <img src={props.movie.Poster} />
    </BasicLayout>
);

Post.getInitialProps = async function (context) {
    const { username } = context.query;
    const res = await fetch(`http://www.omdbapi.com/?i=${username}`);
    const movie = await res.json();

    console.log(`Fetched movie: ${movie.Title}`);

    return { movie };
};

export default Post;
