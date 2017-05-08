const aws = require('aws-sdk');
const path = require('path');
const express = require('express');
const shortid = require('shortid');
const mime = require('mime-types');

const router = express.Router();

const s3 = new aws.S3({
    useAccelerateEndpoint: true
});
const config = require('../../../config');
const cache = require('../../../lib/cache');
const isRaw = require('../utils/isRaw');

function rateLimit(userId) {
    if (!cache.client && process.env.NODE_ENV === 'production') {
        return Promise.resolve(true);
    }

    const key = `rate:sign:${userId}`;
    return cache
        .get(key)
        .then(val => {
            if (val > 30) {
                return true;
            }

            return cache.client
                .multi()
                .incr(key)
                .expire(key, 604800)
                .execAsync()
                .then(() => false);
        })
        .catch(() => false);
}

router.get('/', (req, res, next) => {
    if (!req.user) {
        return next(new Error('Not logged in.'));
    }

    rateLimit(req.user.id).then(rateLimited => {
        if (rateLimited) {
            const err = new Error('Slow down.');
            err.status = 429;

            return next(err);
        }

        const fileType = req.query['file-type'];
        const originalFileName = req.query['file-name'];
        const mimeType = (mime.extension(fileType) || '')
            .replace('jpeg', 'jpg');
        let acl = 'public-read';

        const ext = mimeType ? `.${mimeType}` : path.extname(originalFileName);
        const fileName = `${shortid()}${ext}`;

        if (
            (!isRaw(ext) && req.query.field === 'raw') ||
            (mimeType !== 'jpg' && req.query.field !== 'raw')
        ) {
            const err = new Error('Hmmmmm.');
            err.status = 400;

            return next(err);
        }

        if (mimeType === 'jpg') {
            acl = 'authenticated-read';
        }

        const s3Params = {
            Bucket: config.s3.bucket,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: acl,
            Conditions: [
                { bucket: config.s3.bucket },
                { acl },
                ['starts-with', '$key', ''],
                ['content-length-range', 0, 8e7]
            ],
            Fields: {
                acl
            }
        };

        return s3.createPresignedPost(s3Params, (err, data) => {
            if (err) {
                return next(err);
            }

            const returnData = {
                signedRequest: data,
                url: fileName
            };

            return res.json(returnData);
        });
    });
});

module.exports = router;
