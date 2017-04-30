const { GraphQLObjectType } = require('graphql');

const edit = require('./edit');
const edits = require('./edits');

module.exports = new GraphQLObjectType({
    name: 'EditQueryType',
    fields: {
        edit,
        edits
    }
});
