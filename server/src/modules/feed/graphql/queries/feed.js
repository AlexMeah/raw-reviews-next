const sequelize = require('../../../../lib/sequelize');
const moment = require('moment');
const { GraphQLList, GraphQLString, GraphQLEnumType } = require('graphql');

const feedType = require('../type');

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
    year: 'year'
};

const orders = {
    best: (a, b) => b.score - a.score,
    latest: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
};

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
        }
    },
    resolve(options, args) {
        return sequelize.edit
            .findAll(
                Object.assign(
                    {
                        order: [['createdAt', 'DESC']],
                        limit: !args.userId ? 10000 : null,
                        include: [
                            {
                                model: sequelize.vote,
                                attributes: ['vote', 'userId']
                            },
                            {
                                model: sequelize.user,
                                attributes: ['id']
                            }
                        ]
                    },
                    buildQuery(args)
                )
            )
            .then(results => results.map(r => r.dataValues))
            .then(results =>
                results.map(r =>
                    Object.assign({}, r, {
                        ups: r.votes.filter(v => v.dataValues.vote === 1)
                            .length,
                        downs: r.votes.filter(v => v.dataValues.vote === -1)
                            .length,
                        score: score(r.votes),
                        votes: r.votes.length,
                        userId: r.user.dataValues.id,
                        user: null
                    })
                )
            )
            .then(r => r.sort(orders[args.order || CONSTANTS.best]));
    }
};
