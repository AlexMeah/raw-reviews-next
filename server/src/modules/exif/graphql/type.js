const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const imageSizeType = new GraphQLObjectType({
    name: 'imageSizeType',
    fields: {
        width: {
            type: GraphQLInt
        },
        height: {
            type: GraphQLInt
        }
    }
});

const tagsType = new GraphQLObjectType({
    name: 'tagsType',
    fields: {
        fNumber: {
            type: GraphQLFloat
        },
        exposureTime: {
            type: GraphQLString
        },
        originalExposureTime: {
            type: GraphQLFloat
        },
        focalLength: {
            type: GraphQLString
        },
        focalLengthIn35mmFormat: {
            type: GraphQLString
        },
        iSO: {
            type: GraphQLInt
        },
        lensModel: {
            type: GraphQLString
        },
        make: {
            type: GraphQLString
        },
        model: {
            type: GraphQLString
        },
        shutterSpeedValue: {
            type: GraphQLFloat
        },
        software: {
            type: GraphQLString
        }
    }
});

const exifType = new GraphQLObjectType({
    name: 'ExifType',
    fields: {
        imageSize: {
            type: imageSizeType
        },
        tags: {
            type: tagsType
        }
    }
});

module.exports = new GraphQLObjectType({
    name: 'exifInfo',
    description: 'A object containing image exif',
    fields: {
        beforeExif: {
            type: exifType
        },
        afterExif: {
            type: exifType
        }
    }
});
