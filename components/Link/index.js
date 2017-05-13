import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';

import styleVars from '../../css/vars';

const Link = styled.span`
    color: ${props => styleVars.colors[props.color] || styleVars.colors.secondary};
    cursor: pointer;
    font-weight: ${styleVars.font.bold};
    ${props => props.active && 'text-decoration: underline;'}
`;

export default ({
    color,
    children,
    active,
    onClick,
    className,
    href,
    ...rest
}) => {
    if (onClick && !href) {
        return (
            <Link color={color} active={active} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <NextLink {...rest} href={href}>
            <a>
                <Link
                    className={className}
                    color={color}
                    active={active}
                    onClick={onClick || (() => {})}
                >
                    {children}
                </Link>
            </a>
        </NextLink>
    );
};
