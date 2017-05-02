const getEnv = require('./getEnv')(process.env.NODE_ENV);

const port = process.env.PORT || 3000;

module.exports = {
    host: getEnv({
        production: `http://raw-reviews-prod.flynn.alexmeah.com:${port}`,
        default: `http://local.dev:${port}`
    })
};
