import { get } from './api';

let _isAuthenticated;
const NODE_ENV = process.env.NODE_ENV;
const host = NODE_ENV === 'production'
            ? 'http://raw-reviews-prod.flynn.alexmeah.com'
            : 'http://local.dev:3000/graphql',

const checkAuth = () =>
    get(`${host}/api/me`).then(status => {
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
