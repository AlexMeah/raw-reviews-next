import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

import Button from '../Button';
import H3 from '../H3';
import P from '../P';

const FileInputContainer = styled.label`
    display: block;
    margin-bottom: 2rem;

    > div {
        margin-bottom: 1rem;
    }
`;

const FileInput = styled.input`
    width: 1px;
    height: 1px;
    opacity: 0;
    position: relative;
    top: 4rem;
`;

const progressText = p => {
    if (p >= 100) {
        return '- Uploaded!';
    }

    if (p > 0 && p < 100) {
        return `- Uploading ${p}%`;
    }
};

export default ({
    progress = false,
    label = false,
    name,
    info = null,
    error,
    ...rest
}) => (
    <FileInputContainer htmlFor={name}>
        {label && <H3>{label} {progressText(progress)}</H3>}
        {error && <P>{error}</P>}
        <FileInput {...rest} name={name} id={name} />
        <Button dummy>Select file</Button>
        {info && <div><small>{info}</small></div>}
    </FileInputContainer>
);
