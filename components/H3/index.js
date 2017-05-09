import styled from 'styled-components';

import styleVars from '../../css/vars';

const H3 = styled.h3`
    margin-top: 0;
    color: ${props => styleVars.colors[props.color] || styleVars.colors.body};
`;

export default H3;
