const Sequelize = require('sequelize');
const path = require('path');

const db = require('../../../src/lib/sequelize');

module.exports = {
    sync() {
        return db.sequelize.sync({
            force: true,
        });
    },
    db: db.sequelize.models,
};
