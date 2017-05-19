const { sequelize: { models } } = require('../../../lib/sequelize');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Feed',
    description: 'A feed',
    fields: Object.assign(attributeFields(models.edit))
});
