import { post } from './api';

const NODE_ENV = process.env.NODE_ENV;
const host = NODE_ENV === 'production'
            ? 'http://raw-reviews-prod.flynn.alexmeah.com'
            : 'http://local.dev:3000/graphql',

export default ({ username, password }) =>
    post(`${host}/api/login`, {
        username,
        password
    });
