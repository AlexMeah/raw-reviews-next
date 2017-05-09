const getEnv = require('./getEnv')(process.env.NODE_ENV);

module.exports = {
    sequelize: getEnv({
        production: process.env.DATABASE_URL,
        test: {
            dialect: 'sqlite',
            storage: ':memory:'
            // logging: false
        },
        default: 'postgres://work@local.dev:5432/rawreviews'
    }),
    secret: getEnv({
        production: 'super-prod-secret',
        default: 'super-default-secret'
    }),
    redis: getEnv({
        production: process.env.REDIS_URL,
        default: 'redis://127.0.0.1:6379'
    }),
    s3: {
        bucket: 'raw-reviews-original'
    }
};
