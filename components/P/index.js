import React from 'react';
import styled from 'styled-components';

import styleVars from '../../css/vars';

const P = styled.p`
    color: ${props => styleVars.colors[props.color] || styleVars.colors.body};
    margin: 0 auto 1.5em;
    ${props => props.strong && `font-weight: ${styleVars.font.bold};`};
    ${props => props.copy && 'max-width: 56rem;'}
    ${props => props.mb0 && 'margin-bottom: 0;'}

    &:last-child {
        margin-bottom: 0;
    }
`;

export default P;
