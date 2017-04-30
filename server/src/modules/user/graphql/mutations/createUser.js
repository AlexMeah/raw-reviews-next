const {
    sequelize: {
        models
    }
} = require('../../../../lib/sequelize');
const {
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const Sequelize = require('sequelize');

const userType = require('../type');

module.exports = {
    type: userType,
    args: {
        username: {
            description: 'A username for the user',
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            description: 'A password for the user',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            description: 'A email for the user',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'Creates a new user',
    resolve(options, { username, password, email }) {
        return models.user
            .create({
                username,
                password,
                email
            })
            .then(data => ({
                id: data.id,
                email: data.email,
                username: data.username
            }))
            .catch(Sequelize.ValidationError, err => {
                console.log(err);

                return Promise.reject(err);
            });
    }
};
