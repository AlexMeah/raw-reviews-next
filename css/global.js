import { injectGlobal } from 'styled-components';

import vars from './vars';

export default injectGlobal`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        font-family: 'Source Sans Pro', sans-serif;
        background-color: ${vars.colors.primary};
        color: ${vars.colors.body};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
        line-height: 1.43;
        hyphens: auto
    }

    body {
        font-size: 16px;
        max-width: 120rem;
        margin: 0 auto;
    }

    a {
        color: #fff;
        text-decoration: none;
    }

    h1,
    h2,
    h3, 
    h4,
    h5,
    h6,
    b,
    strong {
        margin-top: 0;
        font-weight: 600;
    }

    .tac {
        text-align: center;
    }

    .mb0 {
        margin-bottom: 0;
    }

    .mb1 {
        margin-bottom: 1rem;
    }

    .mb2 {
        margin-bottom: 2rem;
    }

    .readable {
        max-width: 52rem;
        margin: 0 auto;
    }
`;
