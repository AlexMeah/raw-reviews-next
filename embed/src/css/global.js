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
        background: ${vars.colors.bodyBackground};
        color: ${vars.colors.body};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 400;
        line-height: 1.43;
        hyphens: auto
        min-height: 100vh;
    }

    body {
        font-size: 16px;
        max-width: 120rem;
        margin: 0 auto;
    }

    a {
        color: ${vars.colors.link};
        text-decoration: none;
    }

    .tac {
        text-align: center;
    }
`;
