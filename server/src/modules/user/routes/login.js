const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const router = express.Router();

const { sequelize: { models } } = require('../../../lib/sequelize');
const config = require('../../../config');

router.post('/', (req, res, next) => {
    const { username, id, password } = req.body;

    models.user
        .findOne({
            where: {
                id: username || id
            }
        })
        .then(user => {
            if (!user) {
                const err = new Error('User not found.');
                err.status = 400;

                return Promise.reject(err);
            }

            return user;
        })
        .then(result =>
            result.comparePassword(password).then(match => {
                if (!match) {
                    const err = new Error('Wrong password.');
                    err.status = 400;

                    return Promise.reject(err);
                }

                const token = jwt.sign(result.dataValues, config.secret, {
                    expiresIn: '30 days'
                });

                res.cookie('authtoken', token, {
                    path: '/',
                    httpOnly: true,
                    expires: moment().add(30, 'days').endOf('day').toDate()
                });

                res.set({
                    'x-token': token
                });

                return res.json({
                    id: result.dataValues.id
                });
            })
        )
        .catch(next);
});

module.exports = router;
