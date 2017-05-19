import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

import Button from '../Button';
import H3 from '../H3';
import P from '../P';

const TextAreaContainer = styled.label`
    display: block;
    margin-bottom: 2rem;

    > div {
        margin-bottom: 1rem;
    }
`;

const TextArea = styled.textarea`
border: 0;
box-shadow: ${styleVars.shadow};
padding: 2rem;
width: 100%;
max-width: 50rem;
min-height: 13rem;
font-size: inherit;
vertical-align: middle;
`;

export default ({ progress = false, label = false, name, error, ...rest }) => (
    <TextAreaContainer htmlFor={name}>
        {label && <H3>{label}</H3>}
        {error && <P>{error}</P>}
        <TextArea {...rest} name={name} id={name} />
    </TextAreaContainer>
);
