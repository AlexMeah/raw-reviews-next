const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { sequelize: { models } } = require('../../../lib/sequelize');
const config = require('../../../config');

router.get('/', (req, res, next) => {
    if (!req.user) {
        const err = new Error('Not authorised.');
        err.status = 401;

        return next(err);
    }

    return res.json(req.user);
});

module.exports = router;
