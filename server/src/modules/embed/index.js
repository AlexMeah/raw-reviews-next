const express = require('express');

const cache = require('../../lib/cache');
const { sequelize: { models } } = require('../../lib/sequelize');
const config = require('../../.././../config');

function renderAndCache(req, res) {
    const key = `raw-reviews:embed-cache:${req.params.id}`;

    cache
        .get(key)
        .then(content => {
            if (content && process.env.NODE_ENV === 'production') {
                console.log(key, 'hit');
                return content;
            }

            console.log(key, 'miss');

            return models.edit
                .find({
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => {
                    console.log(result);
                    return result.dataValues;
                })
                .then(result => {
                    const html = `<html><body><div class="raw-progress-embed" data-id="${result.id}" data-before="${result.before}" data-after="${result.after}"></div><script src="${config.embedUrl}"></script></body></html>`;
                    cache.set(key, html, 600);
                    return html;
                });
        })
        .then(html => {
            res.send(html);
        })
        .catch(err => {
            console.error(err);
            res.send('Not found');
        });
}

const router = express.Router();

router.get('/:id', renderAndCache);

module.exports = router;
