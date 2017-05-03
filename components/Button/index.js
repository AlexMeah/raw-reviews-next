import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import buttonStyles from './buttonStyles';

const B = styled.button`${buttonStyles}`;
const A = styled.a`${buttonStyles}`;
const DummyLink = styled.div`${buttonStyles}`;
const CustomLink = styled(Link)`${buttonStyles}`;

const Button = props => {
    if (props.href) {
        return <A {...props} />;
    }

    if (props.to) {
        return <CustomLink href={props.to} {...props} />;
    }

    if (props.dummy) {
        return <DummyLink {...props} />;
    }

    return <B {...props} />;
};

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string
};

Button.defaultProps = {
    to: null,
    href: null
};

export default Button;
