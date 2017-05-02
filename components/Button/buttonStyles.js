import { css } from 'styled-components';

import mix from '../../utils/mix';
import styleVars from '../../css/vars';

function darker(color) {
    return mix('#000', color, 0.289);
}

function dark(color) {
    return mix('#000', color, 0.12);
}

const sizes = {
    xs: 0.6,
    sm: 0.8,
    default: 1,
    lg: 1.2
};

const buttonStyles = css`
    box-shadow: ${styleVars.shadow};
    text-decoration: none;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    user-select: none;
    border: .2rem solid transparent;
    transition: background .2s ease-in-out;
    outline: none !important;
    font-weight: 400;
    line-height: 1;
    padding: ${props => `${(sizes[props.size] || 1) * 1.2}rem ${(sizes[props.size] || 1) * 1.6}rem`};
    font-size: ${props => `${(sizes[props.size] || 1) * 1}em`}    ;
    border-radius: ${styleVars.radius};
    font-family: inherit;
    color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
    background-color: ${props => styleVars.colors[props.color] || styleVars.colors.secondary};
    margin-bottom: 2rem;
    ${props => props.block && 'width: 100%;'}

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
        background-color: ${props => dark(styleVars.colors[props.color] || styleVars.colors.secondary)};
    }

    &:focus {
        color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
        background-color: ${props => dark(styleVars.colors[props.color] || styleVars.colors.secondary)};
    }

    &:active {
        color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
        background-color: ${props => dark(styleVars.colors[props.color] || styleVars.colors.secondary)};
        background-image: none;
        outline: 0;

        &:focus,
        &:hover {
            color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
            background-color: ${props => darker(styleVars.colors[props.color] || styleVars.colors.secondary)};
        }
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .65;

        &.focus,
        &:focus {
            background-color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
        }

        &:hover {
            background-color: ${props => styleVars.colors[`${props.color}Color`] || styleVars.colors.secondaryColor};
        }
    }
`;

export default buttonStyles;
