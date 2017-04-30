const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(config.sequelize);

const db = {
    user: sequelize.import(path.join(__dirname, '../../modules/user/model')),
    edit: sequelize.import(path.join(__dirname, '../../modules/edit/model'))
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
