import styled from 'styled-components';

import styleVars from '../../css/vars';

const H1 = styled.h1`
    margin-top: 0;
    color: ${props => styleVars.colors[props.color] || styleVars.colors.body};

    > span {
        font-size: 0.6em;
        color: ${styleVars.colors.muted};
    }
`;

export default H1;
