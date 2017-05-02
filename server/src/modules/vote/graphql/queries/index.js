const { GraphQLObjectType } = require('graphql');

const votes = require('./votes');

module.exports = new GraphQLObjectType({
    name: 'VoteQueryType',
    fields: {
        votes
    }
});
