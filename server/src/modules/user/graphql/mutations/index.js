const createUser = require('./createUser');
const confirmUser = require('./confirmUser');

module.exports = [
    {
        name: 'createUser',
        mutation: createUser
    },
    {
        name: 'confirmUser',
        mutation: confirmUser
    }
];
