import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

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
    border-radius: ${styleVars.radius};
    background: #fff;
    padding: 1.5rem 2rem;
    font-size: inherit;
    outline: none;
    width: 100%;
    max-width: 50rem;
`;

export default ({
    label = false,
    name,
    error,
    className,
    info = null,
    ...rest
}) =>
    <InputContainer htmlFor={name} className={className}>
        {label &&
            <H3>
                {label}
            </H3>}
        {info &&
            <p>
                {info}
            </p>}
        {error &&
            <P>
                {error}
            </P>}
        <Input {...rest} name={name} id={name} />
    </InputContainer>;
