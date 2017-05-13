import ReactGA from 'react-ga';

import { get } from './api';

import config from '../config';

let _isAuthenticated;

const checkAuth = () =>
    get(`${config.host}/api/me`).then(status => {
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

export default function isAuthenticated() {
    if (_isAuthenticated) {
        return Promise.resolve(true);
    }

    return checkAuth();
}
