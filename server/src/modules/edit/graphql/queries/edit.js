const { sequelize: { models } } = require('../../../../lib/sequelize');
const { resolver } = require('graphql-sequelize');
const { GraphQLNonNull, GraphQLString } = require('graphql');

const editType = require('../type');

module.exports = {
    type: editType,
    args: {
        id: {
            description: 'id of the edit',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: resolver(models.edit)
};
