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
    text-decoration: none;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    user-select: none;
    border: 2px solid transparent;
    transition: background .2s ease-in-out;
    outline: none !important;
    font-weight: 400;
    line-height: 1;
    padding: ${props =>
        `${(sizes[props.size] || 1) * 12}px ${(sizes[props.size] || 1) *
            16}px`};
    font-size: 1em;
    border-radius: ${styleVars.radius};
    font-family: inherit;
    background: transparent;
    ${props =>
        `color: ${styleVars.colors[`${props.color}Color`] ||
            styleVars.colors.primaryColor};`}
    ${props =>
        `background-color: ${styleVars.colors[props.color] ||
            styleVars.colors.primary};`}
    margin-bottom: 20px;
    ${props => props.block && 'width: 100%;'}
    ${props => props.align && `vertical-align: ${props.align};`}

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        ${props =>
            `color: ${styleVars.colors[`${props.color}Color`] ||
                styleVars.colors.primaryColor};`}
        ${props =>
            `background-color: ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
    }

    &:focus {
        ${props =>
            `color: ${styleVars.colors[`${props.color}Color`] ||
                styleVars.colors.primaryColor};`}
        ${props =>
            `background-color: ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
    }

    &:active {
        ${props =>
            `color: ${styleVars.colors[`${props.color}Color`] ||
                styleVars.colors.primaryColor};`}
        ${props =>
            `background-color: ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
        background-image: none;
        outline: 0;

        &:focus,
        &:hover {
            ${props =>
                `color: ${styleVars.colors[`${props.color}Color`] ||
                    styleVars.colors.primaryColor};`}
            ${props =>
                `background-color: ${darker(
                    styleVars.colors[props.color] || styleVars.colors.primary
                )};`}
        }
    }
`;

export default buttonStyles;
