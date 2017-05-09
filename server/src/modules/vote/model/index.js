// | USERS |
// | id | votename | password | email

module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define(
        'vote',
        {
            vote: {
                type: DataTypes.INTEGER,
                validate: {
                    isIn: [[-1, 0, 1]]
                }
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'editId']
                }
            ],
            classMethods: {
                associate: models => {
                    Vote.Edit = Vote.belongsTo(models.edit);
                    Vote.User = Vote.belongsTo(models.user);
                }
            }
        }
    );

    return Vote;
};
