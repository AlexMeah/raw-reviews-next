const sequelize = require('../../../../lib/sequelize');
const moment = require('moment');
const {
    GraphQLList,
    GraphQLString,
    GraphQLEnumType,
    GraphQLInt
} = require('graphql');

const feedType = require('../type');
const cache = require('../../../../lib/cache');

const z = 1.96;

function score(votes) {
    const pos = votes.filter(v => v.dataValues.vote === 1).length;
    const n = votes.length;

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
}
const CONSTANTS = {
    best: 'best',
    latest: 'latest',
    hour: 'hour',
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year',
    all: 'all'
};

const orders = {
    best: [['score', 'DESC'], ['createdAt', 'DESC']],
    latest: [['createdAt', 'DESC']]
};

const cacheKey = args =>
    `feed${args.order || ''}${args.time || ''}${args.userId || ''}${args.limit || ''}${args.offset || ''}`;

function buildQuery(args) {
    const now = moment();
    const time = {
        all: {},
        hour: {
            createdAt: {
                $gt: now.clone().startOf('hour')
            }
        },
        day: {
            createdAt: {
                $gt: now.clone().startOf('day')
            }
        },
        week: {
            createdAt: {
                $gt: now.clone().startOf('week')
            }
        },
        month: {
            createdAt: {
                $gt: now.clone().startOf('month')
            }
        },
        year: {
            createdAt: {
                $gt: now.clone().startOf('year')
            }
        }
    };
    const query = {};

    if (args.time) {
        Object.assign(query, {
            where: time[args.time.toLowerCase()]
        });
    }

    if (args.userId) {
        Object.assign(query, {
            where: Object.assign(query.where, {
                userId: args.userId
            })
        });
    }

    query.order = orders[args.order || CONSTANTS.best];

    return query;
}

module.exports = {
    type: new GraphQLList(feedType),
    args: {
        order: {
            type: new GraphQLEnumType({
                name: 'order',
                values: {
                    latest: { value: CONSTANTS.latest },
                    best: { value: CONSTANTS.best }
                }
            })
        },
        time: {
            type: new GraphQLEnumType({
                name: 'time',
                values: {
                    hour: { value: CONSTANTS.hour },
                    day: { value: CONSTANTS.day },
                    week: { value: CONSTANTS.week },
                    month: { value: CONSTANTS.month },
                    year: { value: CONSTANTS.year },
                    all: { value: CONSTANTS.all }
                }
            })
        },
        userId: {
            type: GraphQLString
        },
        limit: {
            type: GraphQLInt
        },
        offset: {
            type: GraphQLInt
        }
    },
    resolve: function resolve(options, args) {
        const key = cacheKey(args);

        return cache.get(key).then(cacheResult => {
            if (cacheResult) {
                console.log(`feed: ${key} hit`);
                return cacheResult;
            }

            console.log(`feed: ${key} miss`);
            return sequelize.edit
                .findAll(
                    Object.assign(
                        {
                            order: [['createdAt', 'DESC']],
                            limit: args.limit || null,
                            offset: args.offset || 0
                        },
                        buildQuery(args)
                    )
                )
                .then(results => results.map(r => r.dataValues))
                .then(r => {
                    cache.set(key, r, 20);
                    return r;
                });
        });
    }
};
