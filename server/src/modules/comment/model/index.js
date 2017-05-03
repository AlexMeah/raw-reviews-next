// | USERS |
// | id | Commentsname | password | email

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define(
        'comment',
        {
            comment: {
                type: DataTypes.TEXT
            }
        },
        {
            classMethods: {
                associate: models => {
                    Comments.Edit = Comments.belongsTo(models.edit);
                    Comments.User = Comments.belongsTo(models.user);
                }
            }
        }
    );

    return Comments;
};
