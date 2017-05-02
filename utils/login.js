import { post } from './api';

export default ({ username, password }) =>
    post('http://local.dev:3000/api/login', {
        username,
        password
    });
