const {
    sequelize,
    sequelize: { models }
} = require('../../../../lib/sequelize');
const { GraphQLNonNull, GraphQLString, GraphQLEnumType } = require('graphql');
const Sequelize = require('sequelize');

const type = require('../type');

const CONSTANTS = {
    up: 1,
    down: -1,
    neutral: 0
};

function cancelVote(editId, dir, data) {
    return Promise.all([
        data.update({
            vote: 0
        }),
        models.edit.update(
            {
                [dir]: sequelize.literal(`${dir} - 1`)
            },
            {
                where: {
                    id: editId
                }
            }
        )
    ]);
}

function submitVote(userId, editId, dir, data) {
    const vote = dir === 'ups' ? 1 : -1;
    const opposite = dir === 'ups' ? 'downs' : 'ups';
    const _data = data || {};
    const prevVote = _data.dataValues && _data.dataValues.vote;
    const prevDir = prevVote && prevVote !== vote;
    const createVote = values => {
        if (_data.update) {
            return _data.update(values).then(n =>
                Object.assign(_data.dataValues || {}, {
                    vote
                })
            );
        }

        return models.vote.create(values, {
            returning: true
        });
    };

    return Promise.all([
        createVote({
            vote,
            editId,
            userId
        }),
        models.edit.update(
            {
                [dir]: sequelize.literal(`${dir} + 1`),
                [opposite]: prevDir
                    ? sequelize.literal(`${opposite} - 1`)
                    : sequelize.literal(`${opposite}`)
            },
            {
                where: {
                    id: editId
                }
            }
        )
    ]);
}

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
            .find({
                where: {
                    userId: req.user.id,
                    editId
                },
                lock: true
            })
            .then(data => {
                const dir = vote === 1 ? 'ups' : 'downs';
                const hasUpvoted =
                    data && data.dataValues.vote === CONSTANTS.up;
                const hasDownvoted =
                    data && data.dataValues.vote === CONSTANTS.down;
                const cancelUpvote =
                    hasUpvoted &&
                    (vote === CONSTANTS.neutral || vote === CONSTANTS.up);
                const cancelDownvote =
                    hasDownvoted &&
                    (vote === CONSTANTS.neutral || vote === CONSTANTS.down);
                const noop =
                    (hasUpvoted && vote === CONSTANTS.up) ||
                    (hasDownvoted && vote === CONSTANTS.down);

                if (noop) {
                    return [data];
                }

                if (cancelUpvote) {
                    console.log('Cancel Upvote');
                    return cancelVote(editId, 'ups', data);
                }

                if (cancelDownvote) {
                    console.log('Cancel Downvote');
                    return cancelVote(editId, 'downs', data);
                }

                console.log(`Submit vote: ${dir}`);
                return submitVote(req.user.id, editId, dir, data);
            })
            .then(([submittedVote]) => submittedVote);
    }
};
