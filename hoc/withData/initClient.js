import 'isomorphic-fetch';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

let apolloClient = null;

function _initClient({ headers, cookies } = {}, initialState) {
    const networkInterface = createNetworkInterface({
        uri: 'http://local.dev:3000/graphql',
        opts: {
            credentials: 'same-origin'
            // Pass headers here if your graphql server requires them
        }
    });

    networkInterface.use([
        {
            applyMiddleware(req, next) {
                req.options.headers = req.options.headers || {};
                if (process.browser) {
                    const token = localStorage.getItem('authtoken');

                    if (token) {
                        req.options.headers.authorization = `Bearer ${token}`;
                    }
                }

                if (cookies && cookies.authtoken) {
                    req.options.headers.authorization = `Bearer ${cookies.authtoken}`;
                }

                next();
            }
        }
    ]);

    return new ApolloClient({
        initialState,
        ssrMode: !process.browser,
        networkInterface,
        dataIdFromObject: result => {
            if (result.__typename === 'Vote') {
                return result.__typename + result.editId;
            }

            if (result.id && result.__typename) {
                return result.__typename + result.id;
            }

            return null;
        }
    });
}

export default (req, initialState = {}) => {
    if (!process.browser) {
        return _initClient(req, initialState);
    }

    if (!apolloClient) {
        apolloClient = _initClient(req, initialState);
    }

    return apolloClient;
};
