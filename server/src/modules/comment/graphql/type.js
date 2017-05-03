const { sequelize: { models } } = require('../../../lib/sequelize');
const { attributeFields, resolver } = require('graphql-sequelize');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Vote',
    description: 'A vote',
    fields: Object.assign(attributeFields(models.vote))
});
