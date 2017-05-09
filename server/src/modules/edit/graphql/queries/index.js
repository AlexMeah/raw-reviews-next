const { GraphQLObjectType } = require('graphql');

const edit = require('./edit');
const edits = require('./edits');
const reedits = require('./re-edits');

module.exports = new GraphQLObjectType({
    name: 'EditQueryType',
    fields: {
        edit,
        edits,
        reedits
    }
});
