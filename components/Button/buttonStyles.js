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
    border: .2rem solid transparent;
    transition: background .2s ease-in-out;
    outline: none !important;
    font-weight: 400;
    line-height: 1;
    padding: ${props =>
        `${(sizes[props.size] || 1) * 1.2}rem ${(sizes[props.size] || 1) *
            1.6}rem`};
    font-size: 1em;
    border-radius: ${styleVars.radius};
    font-family: inherit;
    background: transparent;
    ${props =>
        !props.outline &&
        `color: ${styleVars.colors[`${props.color}Color`] ||
            styleVars.colors.primaryColor};`}
    ${props =>
        props.outline &&
        `color: ${styleVars.colors[`${props.color}`] ||
            styleVars.colors.primary};`}
    ${props =>
        !props.outline &&
        `background-color: ${styleVars.colors[props.color] ||
            styleVars.colors.primary};`}
    ${props =>
        props.outline &&
        `border: 2px solid ${styleVars.colors[props.color] ||
            styleVars.colors.primary};`}
    margin-bottom: 2rem;
    ${props => props.block && 'width: 100%;'}
    ${props => props.align && `vertical-align: ${props.align};`}

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        ${props =>
            !props.outline &&
            `color: ${styleVars.colors[`${props.color}Color`] ||
                styleVars.colors.primaryColor};`}
        ${props =>
            props.outline &&
            `color: ${styleVars.colors[`${props.color}`] ||
                styleVars.colors.primary};`}
        ${props =>
            !props.outline &&
            `background-color: ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
        ${props =>
            props.outline &&
            `border: 2px solid ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
    }

    &:focus {
        ${props =>
            !props.outline &&
            `color: ${styleVars.colors[`${props.color}Color`] ||
                styleVars.colors.primaryColor};`}
        ${props =>
            props.outline &&
            `color: ${styleVars.colors[`${props.color}`] ||
                styleVars.colors.primary};`}
        ${props =>
            !props.outline &&
            `background-color: ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
        ${props =>
            props.outline &&
            `border: 2px solid ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
    }

    &:active {
        ${props =>
            !props.outline &&
            `color: ${styleVars.colors[`${props.color}Color`] ||
                styleVars.colors.primaryColor};`}
        ${props =>
            props.outline &&
            `color: ${styleVars.colors[`${props.color}`] ||
                styleVars.colors.primary};`}
        ${props =>
            !props.outline &&
            `background-color: ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
        ${props =>
            props.outline &&
            `border: 2px solid ${dark(
                styleVars.colors[props.color] || styleVars.colors.primary
            )};`}
        background-image: none;
        outline: 0;

        &:focus,
        &:hover {
            ${props =>
                !props.outline &&
                `color: ${styleVars.colors[`${props.color}Color`] ||
                    styleVars.colors.primaryColor};`}
            ${props =>
                props.outline &&
                `color: ${styleVars.colors[`${props.color}`] ||
                    styleVars.colors.primary};`}
            ${props =>
                !props.outline &&
                `background-color: ${darker(
                    styleVars.colors[props.color] || styleVars.colors.primary
                )};`}
            ${props =>
                props.outline &&
                `border: 2px solid ${darker(
                    styleVars.colors[props.color] || styleVars.colors.primary
                )};`}
        }
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .2;
        ${props =>
            !props.outline && `background-color: ${styleVars.colors.muted};`}
        ${props =>
            props.outline && `border: 2px solid ${styleVars.colors.muted};`}
        color: ${styleVars.colors.mutedColor};

        &.focus,
        &:focus {
            ${props =>
                !props.outline &&
                `background-color: ${styleVars.colors.muted};`}
            ${props =>
                props.outline && `border: 2px solid ${styleVars.colors.muted};`}
        }

        &:hover {
            ${props =>
                !props.outline &&
                `background-color: ${styleVars.colors.muted};`}
            ${props =>
                props.outline && `border: 2px solid ${styleVars.colors.muted};`}
        }
    }
`;

export default buttonStyles;
