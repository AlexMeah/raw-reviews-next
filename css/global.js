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
        background-color: #74CEB7;
        color: ${vars.colors.body};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
    }

    body {
        font-size: 16px;
        max-width: 120rem;
        margin: 0 auto;
    }

    a {
        color: #FFF;
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
`;
