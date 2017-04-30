const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const userQueries = require('./modules/user/graphql/queries');
const userMutations = require('./modules/user/graphql/mutations');

const editQueries = require('./modules/edit/graphql/queries');
const editMutations = require('./modules/edit/graphql/mutations');

const FIELDS = {
    user: {
        type: userQueries,
        resolve() {
            return {};
        }
    },
    edit: {
        type: editQueries,
        resolve() {
            return {};
        }
    }
};

const mutations = {
    user: userMutations,
    edit: editMutations
};

const MUTATION_FIELDS = Object.keys(mutations).reduce((obj, mutation) => {
    mutations[mutation].forEach(data => {
        obj[`${mutation}_${data.name}`] = data.mutation; // eslint-disable-line
    });

    return obj;
}, {});

const queryObjectType = new GraphQLObjectType({
    name: 'RawReviewsAPI',
    description: 'APIs exposed as GraphQL',
    fields: FIELDS
});

const mutationsType = new GraphQLObjectType({
    name: 'RawReviewsMutationAPI',
    description: 'APIs exposed as GraphQL mutations',
    fields: MUTATION_FIELDS
});

const schema = new GraphQLSchema({
    query: queryObjectType,
    mutation: mutationsType
});

module.exports = schema;
