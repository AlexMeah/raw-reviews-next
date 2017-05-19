const { sequelize: { models } } = require('../../../../lib/sequelize');
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLList
} = require('graphql');
const Sequelize = require('sequelize');

const editType = require('../type');

const exifType = new GraphQLInputObjectType({
    name: 'exif',
    description: 'A object containing image exif',
    fields: {
        imageSize: {
            name: 'imageSize',
            type: new GraphQLInputObjectType({
                name: 'imageSizeObj',
                fields: () => ({
                    width: {
                        type: GraphQLInt
                    },
                    height: {
                        type: GraphQLInt
                    }
                })
            })
        },
        tags: {
            name: 'tags',
            type: new GraphQLInputObjectType({
                name: 'tagsObj',
                fields: () => ({
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
                    lensInfo: {
                        type: GraphQLString
                    },
                    lensMake: {
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
                })
            })
        }
    }
});

module.exports = {
    type: editType,
    args: {
        before: {
            description: 'A before url for the edit',
            type: new GraphQLNonNull(GraphQLString)
        },
        after: {
            description: 'A after url for the edit',
            type: new GraphQLNonNull(GraphQLString)
        },
        beforeExif: {
            description: 'The before images exif info',
            type: exifType
        },
        afterExif: {
            description: 'The after images exif info',
            type: exifType
        },
        raw: {
            description: 'A raw url for the edit',
            type: GraphQLString
        },
        description: {
            description: 'A description for the edit',
            type: GraphQLString
        },
        tags: {
            description: 'The edits tags',
            type: new GraphQLList(GraphQLString)
        },
        parent: {
            description: 'The parent edit',
            type: GraphQLString
        },
        title: {
            description: 'A title for the edit',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    description: 'Creates a new edit',
    resolve(
        options,
        {
            before,
            after,
            raw,
            title,
            description,
            beforeExif,
            afterExif,
            parent,
            tags
        },
        { req }
    ) {
        if (!req.user) {
            return Promise.reject(new Error('Not logged in.'));
        }

        return models.edit
            .create(
                {
                    before,
                    after,
                    raw,
                    description,
                    title,
                    parent,
                    userId: req.user.id,
                    tags
                },
                {
                    returning: true
                }
            )
            .then(data =>
                models.exif
                    .create({
                        editId: data.id,
                        beforeExif,
                        afterExif
                    })
                    .then(() => data)
                    .catch(e => {
                        console.error(e);
                        return data;
                    })
            )
            .catch(Sequelize.ValidationError, err => Promise.reject(err));
    }
};
