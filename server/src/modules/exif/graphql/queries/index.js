const { GraphQLObjectType } = require('graphql');

const exif = require('./exif');

module.exports = new GraphQLObjectType({
    name: 'ExifQueryType',
    fields: {
        exif
    }
});
