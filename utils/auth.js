import { get } from './api';

let _isAuthenticated;

const checkAuth = () =>
    get('http://localhost:3000/api/me').then(status => {
        setTimeout(() => {
            _isAuthenticated = false;
        }, 1000 * 60 * 5);

        _isAuthenticated = Boolean(status);

        return _isAuthenticated;
    });

export default function isAuthenticated() {
    if (_isAuthenticated) {
        return Promise.resolve(true);
    }

    return checkAuth();
}
