// | USERS |
// | id | username | password | email

const bcrypt = require('bcrypt');
const shortid = require('shortid');

function hashPassword(user) {
    if (user.changed('password')) {
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(user.password, salt, null))
            .then(hash => {
                user.password = hash; // eslint-disable-line
                return user;
            });
    }

    return Promise.resolve();
}
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
                validate: {
                    is: ['^[a-z_-\\d]+$', 'i']
                },
                set: function set(val) {
                    this.setDataValue('id', val.toLowerCase());
                },
                unique: {
                    args: true,
                    msg: 'Someone beat you to that username.',
                    fields: [sequelize.fn('lower', sequelize.col('id'))]
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'The email you entered is invalid'
                    }
                },
                set: function set(val) {
                    this.setDataValue('email', val.toLowerCase());
                },
                unique: {
                    args: true,
                    msg: 'Looks like you already have an account try logging in.',
                    fields: [sequelize.fn('lower', sequelize.col('email'))]
                }
            },
            password: {
                type: DataTypes.STRING,
                validate: {}
            },
            validationToken: {
                type: DataTypes.STRING,
                defaultValue: shortid.generate
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            classMethods: {
                associate: models => {
                    User.Edits = User.hasMany(models.edit, { as: 'edits' });
                }
            },
            instanceMethods: {
                comparePassword(password) {
                    return bcrypt.compare(password, this.password);
                }
            },
            hooks: {
                beforeCreate: hashPassword,
                beforeSave: hashPassword,
                beforeFindAfterOptions: query => {
                    if (query.where.id) {
                        return Object.assign(query, {
                            where: Object.assign(query.where, {
                                id: query.where.id.toString().toLowerCase()
                            })
                        });
                    }

                    return query;
                }
            }
        }
    );

    return User;
};
