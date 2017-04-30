const { sequelize: { models } } = require('../../../../lib/sequelize');
const { resolver } = require('graphql-sequelize');
const { GraphQLList, GraphQLInt, GraphQLString } = require('graphql');

const editType = require('../type');

module.exports = {
    type: new GraphQLList(editType),
    args: {
        limit: {
            type: GraphQLInt
        },
        order: {
            type: GraphQLString
        }
    },
    resolve: resolver(models.edit)
};
