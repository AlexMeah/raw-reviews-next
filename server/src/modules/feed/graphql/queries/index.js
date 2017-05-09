const { GraphQLObjectType } = require('graphql');

const feed = require('./feed');

module.exports = new GraphQLObjectType({
    name: 'FeedQueryType',
    fields: {
        feed
    }
});
