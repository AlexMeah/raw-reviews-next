import styled from 'styled-components';

import styleVars from '../../css/vars';

const H2 = styled.h2`
    margin-top: 0;
    color: ${props => styleVars.colors[props.color] || styleVars.colors.body};
`;

export default H2;
