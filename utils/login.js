import { post } from './api';

import config from '../config';

export default ({ username, password }) =>
    post(`${config.host}/api/login`, {
        username,
        password
    });
