const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(config.sequelize, {
    logging: process.env.NODE_ENV !== 'production' ? console.log : false
});

const db = {
    user: sequelize.import(path.join(__dirname, '../../modules/user/model')),
    vote: sequelize.import(path.join(__dirname, '../../modules/vote/model')),
    edit: sequelize.import(path.join(__dirname, '../../modules/edit/model')),
    exif: sequelize.import(path.join(__dirname, '../../modules/exif/model')),
    comment: sequelize.import(
        path.join(__dirname, '../../modules/comment/model')
    )
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
