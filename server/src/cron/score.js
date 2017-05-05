const moment = require('moment');
const Promise = require('bluebird');

const db = require('../lib/sequelize');

const DAY = 8.64e7;
const MINUTE = 60000;

function fetchEdits(query = {}, page = 0) {
    return db.edit.findAll({
        where: Object.assign({}, query),
        offset: page * 1000,
        limit: 1000
    });
}

const z = 1.96;

const calc = (pos, n) => {
    if (n === 0) {
        return 0;
    }

    const phat = 1.0 * pos / n;

    return (
        (phat +
            z * z / (2 * n) -
            z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) /
        (1 + z * z / n)
    );
};

function score(edit) {
    const pos = edit.dataValues.ups;
    const n = edit.dataValues.ups + edit.dataValues.downs;
    const scoreVal = calc(pos, n);

    return edit.update({
        score: scoreVal
    });
}

function scoreEdits(end, delay) {
    let scored = 0;

    const loop = (page = 0) =>
        fetchEdits(
            end
                ? {
                    createdAt: {
                        $gt: end
                    }
                }
                : {},
            page
        ).then(data => {
            if (data.length) {
                scored += data.length;
                return Promise.all(data.map(score))
                    .delay(delay)
                    .then(() => loop(page + 1));
            }

            return null;
        });

    loop(0)
        .then(() => {
            console.log(`Scored ${scored} edits`);
        })
        .catch(console.error);
}

const scoreLatest = () => {
    scoreEdits(moment().subtract(7, 'days').startOf('day').toDate(), 300);
};

setInterval(scoreLatest, MINUTE);

const scoreOld = () => {
    scoreEdits(null, 3000);
};

setInterval(scoreOld, DAY);

scoreOld();
