const { sequelize: { models } } = require('../../../lib/sequelize');
const { attributeFields, resolver } = require('graphql-sequelize');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Edit',
    description: 'A edit',
    fields: Object.assign(attributeFields(models.edit), {
        user: {
            type: new GraphQLObjectType({
                name: 'user',
                fields: {
                    id: {
                        type: GraphQLString
                    }
                }
            }),
            resolve: resolver(models.edit.User, {
                separate: false,
                after: data => ({
                    id: data.dataValues.id
                })
            })
        },
        votes: {
            type: new GraphQLObjectType({
                name: 'votes',
                fields: {
                    ups: {
                        type: GraphQLInt
                    },
                    downs: {
                        type: GraphQLInt
                    }
                }
            }),
            resolve: resolver(models.edit.Vote, {
                separate: false,
                after: data => ({
                    ups: data.filter(d => d.dataValues.vote === 1).length,
                    downs: data.filter(d => d.dataValues.vote === -1).length
                })
            })
        }
    })
});
