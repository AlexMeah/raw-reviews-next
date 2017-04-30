import 'isomorphic-fetch';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

let apolloClient = null;

function _initClient(headers, initialState) {
    const networkInterface = createNetworkInterface({
        uri: 'http://localhost:3000/graphql',
        opts: {
            credentials: 'same-origin'
            // Pass headers here if your graphql server requires them
        }
    });

    networkInterface.use([
        {
            applyMiddleware(req, next) {
                req.options.headers = req.options.headers || {};

                const token = localStorage.getItem('authtoken');

                if (token) {
                    req.options.headers.authorization = `Bearer ${token}`;
                }

                next();
            }
        }
    ]);

    return new ApolloClient({
        initialState,
        ssrMode: !process.browser,
        dataIdFromObject: result => result.id || null,
        networkInterface
    });
}

export default (headers, initialState = {}) => {
    if (!process.browser) {
        return _initClient(headers, initialState);
    }

    if (!apolloClient) {
        apolloClient = _initClient(headers, initialState);
    }

    return apolloClient;
};
