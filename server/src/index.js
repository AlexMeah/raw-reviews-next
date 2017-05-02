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
const sign = require('./modules/s3/routes/sign');
const graphqlSchema = require('./graphqlSchema');
const db = require('./lib/sequelize');

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

        server.use('/api/login', login);

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

        server.get('/u/login', (req, res) => {
            if (req.user) {
                return res.redirect('/');
            }

            const actualPage = '/u/login';
            return app.render(req, res, actualPage, req.query);
        });

        server.get('/u/create', (req, res) => {
            const actualPage = '/u/create';
            app.render(req, res, actualPage, req.query);
        });

        server.get('/u/:userId', (req, res) => {
            const actualPage = '/u/profile';
            app.render(
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
            app.render(
                req,
                res,
                actualPage,
                Object.assign({}, req.query, req.params)
            );
        });

        server.get('*', (req, res) => handle(req, res));

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
