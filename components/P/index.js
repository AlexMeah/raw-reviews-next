import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

const P = styled.p`
    color: ${props => styleVars.colors[props.color] || styleVars.colors.body};
    margin-top: 0;
    margin-bottom: 1.5em;
    ${props => props.strong && 'font-weight: 600'};

    &:last-child {
        margin-bottom: 0;
    }
`;

export default P;
