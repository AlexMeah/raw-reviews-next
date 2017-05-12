import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import styleVars from '../../css/vars';
import config from '../../config';

const Container = styled.div`
    position: relative;
    width: 26rem;
    padding-bottom: 26rem;
    height: 0;
    margin: 0 auto;
    overflow: hidden;
`;

const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease-in-out;
    width: 100%;
    height: auto;
    display: block;
`;

const After = styled(Img)`
    &:hover {
        opacity: 0;
    }
`;

const Image = ({ before, after }) => (
    <Container>
        <LazyLoad once>
            <Img src={`${config.cdn}/resized/square/${before}`} />
        </LazyLoad>
        <LazyLoad once>
            <After src={`${config.cdn}/resized/square/${after}`} />
        </LazyLoad>
    </Container>
);

export default Image;
