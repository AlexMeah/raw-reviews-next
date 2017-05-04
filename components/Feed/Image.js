import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';
import config from '../../config';

const Container = styled.div`
    position: relative;
    width: 15rem;
    padding-bottom: 15rem;
    height: 0;
    margin: 0 auto;
    border-radius: ${styleVars.radius};
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
        <Img src={`${config.cdn}/resized/square/${before}`} />
        <After src={`${config.cdn}/resized/square/${after}`} />
    </Container>
);

export default Image;
