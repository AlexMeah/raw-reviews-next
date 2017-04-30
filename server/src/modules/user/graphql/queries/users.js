const { sequelize: { models } } = require('../../../../lib/sequelize');
const { resolver } = require('graphql-sequelize');
const { GraphQLList, GraphQLInt, GraphQLString } = require('graphql');

const userType = require('../type');
const utils = require('../utils');

module.exports = {
    type: new GraphQLList(userType),
    args: {
        limit: {
            type: GraphQLInt
        },
        order: {
            type: GraphQLString
        }
    },
    resolve: resolver(models.user, {
        before: utils.filterSecure
    })
};
