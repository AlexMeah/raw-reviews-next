const { sequelize: { models } } = require('../../../../lib/sequelize');
const { GraphQLNonNull, GraphQLString, GraphQLEnumType } = require('graphql');
const Sequelize = require('sequelize');

const type = require('../type');

const CONSTANTS = {
    up: 1,
    down: -1,
    neutral: 0
};

module.exports = {
    type,
    args: {
        vote: {
            description: 'A int representing vote',
            type: new GraphQLEnumType({
                name: 'vote',
                values: {
                    up: { value: CONSTANTS.up },
                    down: { value: CONSTANTS.down },
                    neutral: { value: CONSTANTS.neutral }
                }
            })
        },
        editId: {
            description: 'A int representing editid',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'Creates a new vote',
    resolve(options, { vote, editId }, { req }) {
        if (!req.user) {
            return Promise.reject(new Error('Not logged in.'));
        }

        return models.vote
            .upsert({
                vote,
                editId,
                userId: req.user.id
            })
            .then(() =>
                models.vote.find({
                    where: {
                        editId,
                        userId: req.user.id
                    }
                })
            )
            .catch(Sequelize.ValidationError, err => Promise.reject(err));
    }
};
