import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

import Button from '../Button';
import H3 from '../H3';
import P from '../P';

const InputContainer = styled.label`
    display: block;
    margin-bottom: 2rem;

    > div {
        margin-bottom: 1rem;
    }
`;

const Input = styled.input`
border: 0;
box-shadow: ${styleVars.shadow};
padding: 1rem 2rem;
font-size: inherit;
outline: none;
width: 100%;
max-width: 60rem;
`;

export default ({ progress = false, label = false, name, error, ...rest }) => (
    <InputContainer htmlFor={name}>
        {label && <H3>{label}</H3>}
        {error && <P>{error}</P>}
        <Input {...rest} name={name} id={name} />
    </InputContainer>
);
