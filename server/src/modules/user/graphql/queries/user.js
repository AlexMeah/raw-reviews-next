const { sequelize: { models } } = require('../../../../lib/sequelize');
const { resolver } = require('graphql-sequelize');
const { GraphQLNonNull, GraphQLString } = require('graphql');

const userType = require('../type');
const utils = require('../utils');

module.exports = {
    type: userType,
    args: {
        username: {
            description: 'id of the user',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: resolver(models.user, {
        before: utils.filterSecure
    })
};
