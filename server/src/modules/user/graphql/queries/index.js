const { GraphQLObjectType } = require('graphql');

const user = require('./user');
const users = require('./users');

module.exports = new GraphQLObjectType({
    name: 'UserQueryType',
    fields: {
        user,
        users
    }
});
