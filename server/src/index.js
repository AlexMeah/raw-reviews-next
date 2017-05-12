const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('express-jwt');
const next = require('next');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const config = require('./config');
const clientConfig = require('../../config');
const me = require('./modules/user/routes/me');
const login = require('./modules/user/routes/login');
const logout = require('./modules/user/routes/logout');
const sign = require('./modules/s3/routes/sign');
const graphqlSchema = require('./graphqlSchema');
const db = require('./lib/sequelize');
const cache = require('./lib/cache');

/*
* CRON like tasks
*/

if (process.env.NODE_ENV === 'production') {
    require('./cron/score'); // eslint-disable-line
}

function getCacheKey(req) {
    return req.originalUrl;
}

function renderAndCache(req, res, pagePath, queryParams, duration = 30) {
    const key = `raw-reviews:render-cache:${getCacheKey(req)}`;

    cache
        .get(key)
        .then(content => {
            if (content && process.env.NODE_ENV === 'production') {
                console.log(key, 'hit');
                return content;
            }

            console.log(key, 'miss');
            return app
                .renderToHTML(
                    req,
                    res,
                    pagePath || req.url,
                    queryParams || req.query
                )
                .then(html => {
                    cache.set(key, html, duration);
                    return html;
                });
        })
        .then(html => {
            res.send(html);
        })
        .catch(err => {
            app.renderError(err, req, res, pagePath, queryParams);
        });
}

function syncModels() {
    return Promise.all([
        db.user.sync({
            alter: true
        }),
        db.edit.sync({
            alter: true
        }),
        db.vote.sync({
            alter: true
        }),
        db.exif.sync({
            alter: true
        }),
        db.comment.sync({
            alter: true
        })
    ]);
}

Promise.all([app.prepare(), db.sequelize.authenticate().then(syncModels)])
    .then(() => {
        const server = express();

        if (!dev) {
            server.use(compression());
        }

        server.set('db', db);

        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());
        server.use(cookieParser());

        server.use('/static', express.static('static'));

        server.use('/api/login', login);
        server.use('/api/logout', logout);

        server.use(
            jwt({
                secret: config.secret,
                credentialsRequired: false,
                getToken: function fromHeaderOrQuerystring(req) {
                    if (
                        req.headers.authorization &&
                        req.headers.authorization.split(' ')[0] === 'Bearer'
                    ) {
                        return req.headers.authorization.split(' ')[1];
                    } else if (true) {
                        return req.cookies.authtoken;
                    }

                    return null;
                }
            })
        );

        server.use('/api/me', me);
        server.use('/api/sign', sign);
        server.use('/graphql', (req, res, _next) =>
            graphqlExpress({
                schema: graphqlSchema,
                context: {
                    req,
                    res
                }
            })(req, res, _next)
        );

        server.use(
            '/graphiql',
            graphiqlExpress({
                endpointURL: '/graphql'
            })
        );

        server.get('/u/:userId', (req, res) => {
            const actualPage = '/u/profile';
            renderAndCache(
                req,
                res,
                actualPage,
                Object.assign({}, req.query, req.params)
            );
        });

        server.get('/e/create', (req, res) => {
            const actualPage = '/e/create';
            app.render(req, res, actualPage, req.query);
        });

        server.get('/e/edit', (req, res) => {
            const actualPage = '/e/edit';
            app.render(req, res, actualPage, req.query);
        });

        server.get('/e/:editId', (req, res) => {
            const actualPage = '/e/view';
            renderAndCache(
                req,
                res,
                actualPage,
                Object.assign({}, req.query, req.params)
            );
        });

        server.get('/e/:editId/r/create', (req, res) => {
            const actualPage = '/e/r/create';
            app.render(
                req,
                res,
                actualPage,
                Object.assign({}, req.query, req.params)
            );
        });

        server.get('/e/:editId/r/:reeditId', (req, res) => {
            const actualPage = '/e/r/view';
            renderAndCache(
                req,
                res,
                actualPage,
                Object.assign({}, req.query, req.params)
            );
        });

        server.get('/', (req, res) => {
            renderAndCache(req, res, '/', req.query);
        });

        server.get('/_next/*', (req, res) => handle(req, res));
        server.get('*', (req, res) => renderAndCache(req, res));

        server.use((err, req, res, _next) => {
            console.error(err);
            res.status(err.status || 500).json({
                code: err.code,
                message: err.message
            });
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on ${clientConfig.host}`);
        });

        process.on('uncaughtException', error => {
            console.error(error);

            setTimeout(() => {
                server.close(() => process.exit(1));
            }, 3000);
        });

        process.on('unhandledRejection', error => {
            console.error(error);
        });

        function shutdown() {
            process.exit(0);
        }

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
