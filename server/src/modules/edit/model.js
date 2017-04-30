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
            description: DataTypes.STRING,
            url: {
                type: DataTypes.STRING,
                defaultValue: shortid.generate
            }
        },
        {
            indexes: [
                {
                    fields: ['url']
                }
            ],
            classMethods: {
                associate: models => {
                    Edit.User = Edit.belongsTo(models.user);
                }
            }
        }
    );

    return Edit;
};
