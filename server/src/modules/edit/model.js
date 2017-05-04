// | EDITS |
// | id | userId | before | after | raw | description | createdAt
const shortid = require('shortid');

module.exports = (sequelize, DataTypes) => {
    const Edit = sequelize.define(
        'edit',
        {
            before: DataTypes.STRING,
            after: DataTypes.STRING,
            raw: DataTypes.STRING,
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            parent: DataTypes.STRING,
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
                defaultValue: shortid.generate
            }
        },
        {
            indexes: [
                {
                    fields: ['createdAt']
                }
            ],
            classMethods: {
                associate: models => {
                    Edit.User = Edit.belongsTo(models.user);
                    Edit.Vote = Edit.hasMany(models.vote);
                    Edit.Comment = Edit.hasMany(models.comment);
                }
            }
        }
    );

    return Edit;
};
