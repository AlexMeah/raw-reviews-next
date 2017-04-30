const { sequelize: { models } } = require('../../../lib/sequelize');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Edit',
    description: 'A edit',
    fields: Object.assign(
        attributeFields(models.edit),
        {
            // tasks: {
            //     type: new GraphQLList(taskType),
            //     resolve: resolver(models.edit.Tasks, {
            //         separate: false
            //     })
            // }
        }
    )
});
