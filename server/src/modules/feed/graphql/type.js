const { sequelize: { models } } = require('../../../lib/sequelize');
const { attributeFields } = require('graphql-sequelize');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Feed',
    description: 'A feed',
    fields: Object.assign(attributeFields(models.edit), {
        ups: {
            type: GraphQLInt
        },
        downs: {
            type: GraphQLInt
        },
        score: {
            type: GraphQLFloat
        },
        votes: {
            type: GraphQLInt
        },
        userId: {
            type: GraphQLString
        }
    })
});
