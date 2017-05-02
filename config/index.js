const getEnv = require('./getEnv')(process.env.NODE_ENV);

const port = process.env.PORT || 3000;

module.exports = {
    host: getEnv({
        production: 'http://alexmeah-raw-reviews-next-mast.flynn.alexmeah.com',
        default: `http://local.dev:${port}`
    })
};
