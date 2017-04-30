const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { sequelize: { models } } = require('../../../lib/sequelize');
const config = require('../../../config');

router.post('/', (req, res, next) => {
    const { username, password } = req.body;

    models.user
        .findOne({
            where: {
                username
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

                res.set({
                    'x-token': jwt.sign(result.dataValues, config.secret, {
                        expiresIn: '30 days'
                    })
                });

                return res.json(
                    Object.assign({
                        id: result.dataValues.id,
                        username: result.dataValues.username
                    })
                );
            })
        )
        .catch(next);
});

module.exports = router;
