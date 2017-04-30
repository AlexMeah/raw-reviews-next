const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('express-jwt');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const config = require('./config');
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

        server.use('/api/login', login);

        server.use(
            jwt({
                secret: config.secret,
                credentialsRequired: false
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
            console.log(req);
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

        server.get('/u/:username', (req, res) => {
            const actualPage = '/u/profile';
            const queryParams = { username: req.params.username };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('/e/create', (req, res) => {
            const actualPage = '/e/create';
            app.render(req, res, actualPage, req.query);
        });

        server.get('/e/edit', (req, res) => {
            const actualPage = '/e/edit';
            app.render(req, res, actualPage, req.query);
        });

        server.get('/e/:id', (req, res) => {
            const actualPage = '/e/view';
            const queryParams = { id: req.params.id };
            app.render(req, res, actualPage, queryParams);
        });

        server.get('*', (req, res) => handle(req, res));

        server.use((err, req, res, _next) => {
            console.error(err);
            res.status(err.status || 500).json({
                code: err.code,
                message: err.message
            });
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
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
