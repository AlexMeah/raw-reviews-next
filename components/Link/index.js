import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

import styleVars from '../../css/vars';

const Link = styled.span`
    color: ${props => styleVars.colors[props.color] || styleVars.colors.secondary};
    cursor: pointer;
    font-weight: 600;
    ${props => props.active && 'text-decoration: underline;'}
`;

export default ({ color, children, active, onClick, ...rest }) => {
    if (onClick) {
        return (
            <Link color={color} active={active} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <NextLink {...rest}>
            <a><Link color={color} active={active}>{children}</Link></a>
        </NextLink>
    );
};
