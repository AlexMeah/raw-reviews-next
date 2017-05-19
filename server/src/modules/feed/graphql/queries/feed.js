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

const CONSTANTS = {
    best: 'best',
    latest: 'latest',
    hot: 'hot',
    hour: 'hour',
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year',
    all: 'all'
};

const orders = {
    best: [['score', 'DESC'], ['createdAt', 'DESC']],
    latest: [['createdAt', 'DESC']],
    hot: [['hot', 'DESC'], ['createdAt', 'DESC']]
};

const cacheKey = args =>
    `feed${args.order || ''}${args.time || ''}${args.userId || ''}${args.limit || ''}${args.offset || ''}`;

function buildQuery(args) {
    const now = moment();
    const time = {
        all: {},
        hour: {
            createdAt: {
                $gt: now.clone().subtract(1, 'hour')
            }
        },
        day: {
            createdAt: {
                $gt: now.clone().startOf('day')
            }
        },
        week: {
            createdAt: {
                $gt: now.clone().startOf('isoWeek')
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
    const query = {
        where: {}
    };

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

    if (args.tags) {
        Object.assign(query, {
            where: Object.assign(query.where, {
                tags: {
                    $contains: args.tags
                }
            })
        });
    }

    query.order = orders[args.order || CONSTANTS.hot];

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
                    best: { value: CONSTANTS.best },
                    hot: { value: CONSTANTS.hot }
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
        },
        tags: {
            type: new GraphQLList(GraphQLString)
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
