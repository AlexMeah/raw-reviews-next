import 'isomorphic-fetch';
import Router from 'next/router';

const getToken = () => window.localStorage.getItem('authtoken');
const setToken = token => window.localStorage.setItem('authtoken', token);
const delToken = () => window.localStorage.removeItem('authtoken');

const errorHandler = err => {
    if (err.code === 'invalid_token') {
        delToken();
    }

    return Promise.reject(err);
};

const statusCheck = resp => {
    if (
        resp.status === 401 &&
        window.location.pathname.indexOf('login') === -1 &&
        window.location.pathname.indexOf('register') === -1
    ) {
        Router.push({
            pathname: '/login',
            query: {
                returnTo: window.location.href
            }
        });
    } else {
        if (!resp.ok) {
            return resp.json().then(data => {
                const err = new Error(data.message);

                Object.assign(err, data);

                return Promise.reject(err);
            });
        }

        return resp.json();
    }
};

const extractToken = resp => {
    const token = resp.headers.get('x-token');

    if (token) {
        setToken(token);
    }

    return resp;
};

export function get(url) {
    const token = getToken();
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    if (token) {
        Object.assign(headers, {
            Authorization: `Bearer ${token}`
        });
    }

    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers
    })
        .then(extractToken)
        .then(statusCheck)
        .catch(errorHandler);
}

export function post(url, body) {
    const token = getToken();
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    if (token) {
        Object.assign(headers, {
            Authorization: `Bearer ${token}`
        });
    }

    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers,
        body: JSON.stringify(body)
    })
        .then(extractToken)
        .then(statusCheck)
        .catch(errorHandler);
}
