const { sequelize: { models } } = require('../../../../lib/sequelize');
const { resolver } = require('graphql-sequelize');
const { GraphQLNonNull, GraphQLString } = require('graphql');

const type = require('../type');

module.exports = {
    type,
    args: {
        editId: {
            description: 'id of the edit',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(options, { editId }) {
        return models.exif.find({
            where: {
                editId
            }
        });
    }
};
