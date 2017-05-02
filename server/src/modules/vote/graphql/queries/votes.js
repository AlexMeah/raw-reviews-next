const { sequelize: { models } } = require('../../../../lib/sequelize');
const { GraphQLString, GraphQLList, GraphQLObjectType } = require('graphql');
const moment = require('moment');

const type = require('../type');

module.exports = {
    type: new GraphQLList(type),
    args: {
        editId: {
            type: new GraphQLList(GraphQLString)
        }
    },
    resolve(options, args, { req }) {
        if (!req.user) {
            return [];
        }

        let query;

        if (Array.isArray(args.editId)) {
            query = models.vote.findAll({
                where: {
                    editId: {
                        $in: args.editId
                    },
                    userId: req.user.id
                }
            });
        } else {
            query = models.vote.findAll({
                where: {
                    userId: req.user.id,
                    updatedAt: {
                        $gt: moment().subtract(1, 'month').toDate()
                    }
                }
            });
        }

        return query.then(data => (Array.isArray(data) ? data : [data]));
    }
};
