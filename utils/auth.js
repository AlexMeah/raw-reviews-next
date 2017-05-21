import ReactGA from 'react-ga';

import { get } from './api';

import config from '../config';

let _isAuthenticated;

const checkAuth = options =>
    get(`${config.host}/api/me`, options).then(status => {
        ReactGA.set({ userId: status.id });
        setTimeout(() => {
            _isAuthenticated = false;
        }, 1000 * 60 * 5);

        _isAuthenticated = Boolean(status);

        if (
            typeof window !== 'undefined' &&
            _isAuthenticated &&
            !window.localStorage.getItem('authtoken')
        ) {
            _isAuthenticated = false;
        }

        return _isAuthenticated;
    });

export default function isAuthenticated(
    { force = false, authRedirect = true } = {}
) {
    if (_isAuthenticated && !force) {
        return Promise.resolve(true);
    }

    return checkAuth({
        authRedirect
    });
}
