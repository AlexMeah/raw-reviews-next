import { h } from 'preact';
import styled from 'styled-components';

import buttonStyles from './buttonStyles';

const B = styled.button`${buttonStyles};`;

const Button = props => <B {...props} />;

Button.defaultProps = {
    to: null,
    href: null
};

export default Button;
