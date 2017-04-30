const {
    sequelize: {
        models
    }
} = require('../../../../lib/sequelize');
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const userType = require('../type');

module.exports = {
    type: userType,
    args: {
        id: {
            description: 'The users id',
            type: new GraphQLNonNull(GraphQLInt)
        },
        validationToken: {
            description: 'The validationToken',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'Confirms a new user',
    resolve(obj, { id, validationToken }) {
        return models.user
            .update(
            {
                confirmed: true
            },
            {
                where: {
                    id,
                    validationToken
                },
                returning: true,
                plain: true
            }
            )
            .then(result => result[1]);
    }
};
