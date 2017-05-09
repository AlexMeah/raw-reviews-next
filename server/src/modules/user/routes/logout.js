const express = require('express');
const moment = require('moment');

const router = express.Router();

const { sequelize: { models } } = require('../../../lib/sequelize');
const config = require('../../../config');

router.get('/', (req, res) => {
    res.cookie('authtoken', '', {
        path: '/',
        httpOnly: true,
        expires: moment().subtract(30, 'days').toDate()
    });

    res.redirect('/');
});

module.exports = router;
