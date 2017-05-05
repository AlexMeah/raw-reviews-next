import styled from 'styled-components';

import styleVars from '../../css/vars';

const Div = styled.div`
    padding: 2rem;
    background: #FFFFFF;
    box-shadow: ${styleVars.shadow};
    border-radius: ${styleVars.radius};
    color: ${props => styleVars.colors[props.color] || styleVars.colors.bodyDark};
    text-align: left;

    margin-bottom: 2rem;
`;

export default Div;
