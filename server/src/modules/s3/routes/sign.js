const aws = require('aws-sdk');
const path = require('path');
const express = require('express');
const shortid = require('shortid');
const mime = require('mime-types');

const router = express.Router();

const s3 = new aws.S3();
const config = require('../../../config');
const isRaw = require('../utils/isRaw');

router.get('/', (req, res, next) => {
    const fileType = req.query['file-type'];
    const originalFileName = req.query['file-name'];
    const mimeType = mime.extension(fileType);

    const ext = mimeType ? `.${mimeType}` : path.extname(originalFileName);
    const fileName = `${shortid()}${ext}`;

    if (
        (!isRaw(ext) && req.query.field === 'raw') ||
        (mimeType !== 'jpeg' && req.query.field !== 'raw')
    ) {
        const err = new Error('Hmmmmm.');
        err.status = 400;

        return next(err);
    }

    const s3Params = {
        Bucket: config.s3.bucket,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
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

module.exports = router;
