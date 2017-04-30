const {
    test
} = require('ava');

const validSchema = {
    username: 'defined',
    password: 'defined',
    email: 'a@a.com'
};

const validation = require('./');

test('valid', t => {
    t.deepEqual(validation(validSchema), {
        errors: false,
        values: validSchema
    });
});

test('strip unknown value', t => {
    const validWithUnkowns = Object.assign({}, validSchema, {
        unknown: true
    });

    t.deepEqual(validation(validWithUnkowns), {
        errors: false,
        values: validSchema
    });
});

test('undefined username', t => {
    t.deepEqual(
        validation({
            password: 'defined',
            email: 'a@a.com'
        }),
        {
            errors: [
                {
                    key: 'username',
                    msg: 'Username must not be empty.'
                }
            ],
            values: {
                username: undefined,
                password: 'defined',
                email: 'a@a.com'
            }
        }
    );
});

test('undefined password', t => {
    t.deepEqual(
        validation({
            username: 'defined',
            email: 'a@a.com'
        }),
        {
            errors: [
                {
                    key: 'password',
                    msg: 'Password must not be empty.'
                }
            ],
            values: {
                password: undefined,
                username: 'defined',
                email: 'a@a.com'
            }
        }
    );
});

test('undefined email', t => {
    t.deepEqual(
        validation({
            username: 'defined',
            password: 'defined'
        }),
        {
            errors: [
                {
                    key: 'email',
                    msg: 'Email must not be empty.'
                }
            ],
            values: {
                email: undefined,
                username: 'defined',
                password: 'defined'
            }
        }
    );
});

test('invalid emails', t => {
    const emails = ['@a.com', 'a.com', '@.com', 'a@.com'];

    emails.forEach(email => {
        const validWithBadEmail = Object.assign({}, validSchema, {
            email
        });

        t.deepEqual(
            validation(validWithBadEmail),
            {
                errors: [
                    {
                        key: 'email',
                        msg: "Email isn't valid."
                    }
                ],
                values: {
                    email,
                    username: 'defined',
                    password: 'defined'
                }
            },
            `${email} passed`
        );
    });
});

test('valid emails', t => {
    const emails = ['a@a.com', 'a@a.co.uk', 'a@a.reviews'];

    emails.forEach(email => {
        const validWithEmail = Object.assign({}, validSchema, {
            email
        });

        t.deepEqual(
            validation(validWithEmail),
            {
                errors: false,
                values: {
                    email,
                    username: 'defined',
                    password: 'defined'
                }
            },
            `${email} failed`
        );
    });
});
