const { sequelize: { models } } = require('../../../../lib/sequelize');
const { GraphQLNonNull, GraphQLString } = require('graphql');
const Sequelize = require('sequelize');

const editType = require('../type');

module.exports = {
    type: editType,
    args: {
        before: {
            description: 'A before url for the edit',
            type: new GraphQLNonNull(GraphQLString)
        },
        after: {
            description: 'A after url for the edit',
            type: new GraphQLNonNull(GraphQLString)
        },
        raw: {
            description: 'A raw url for the edit',
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            description: 'A description for the edit',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'Creates a new edit',
    resolve(options, { before, after, raw, description }, { req }) {
        if (!req.user) {
            return Promise.reject(new Error('No logged in.'));
        }

        return models.edit
            .create({
                before,
                after,
                raw,
                description,
                userId: req.user.id
            })
            .then(data => ({
                id: data.id,
                url: data.url
            }))
            .catch(Sequelize.ValidationError, err => {
                console.log(err);

                return Promise.reject(err);
            });
    }
};
