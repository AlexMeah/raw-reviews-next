import { post } from './api';

export default ({ username, password }) =>
    post('http://localhost:3000/api/login', {
        username,
        password
    });
