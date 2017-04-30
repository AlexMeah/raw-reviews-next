const { sequelize: { models } } = require('../../../lib/sequelize');
const { attributeFields, resolver } = require('graphql-sequelize');
const { GraphQLObjectType, GraphQLList } = require('graphql');

const editType = require('../../edit/graphql/type');

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: Object.assign(attributeFields(models.user), {
        edit: {
            type: new GraphQLList(editType),
            resolve: resolver(models.user.Edits, {
                separate: false
            })
        }
    })
});
