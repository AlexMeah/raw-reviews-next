const {
    test
} = require('ava');
const shortid = require('shortid');

const dbFactory = require('../../../../test/utils/databaseFactory/index.js');

test.beforeEach(async () => {
    await dbFactory.sync();
});

test('create', async t => {
    await dbFactory.db.user.create({
        username: 'username',
        password: 'password',
        email: 'email'
    });

    const user = await dbFactory.db.user.findOne({
        where: {
            email: 'email'
        }
    });

    const data = user.dataValues;

    t.is(data.username, 'username');
    t.is(data.email, 'email');
    t.is(data.confirmed, false);
    t.truthy(data.createdAt);
    t.truthy(data.updatedAt);
    t.true(shortid.isValid(data.validationToken));

    const validPassword = await user.comparePassword('password');

    t.true(validPassword);
});
