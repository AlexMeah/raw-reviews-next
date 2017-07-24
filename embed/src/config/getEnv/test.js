const { test } = require('ava');

const getEnv = require('./');

test('default', t => {
    t.is(
        getEnv('nomatch')({
            production: 'test',
            default: 'default'
        }),
        'default'
    );
});

test('match', t => {
    t.is(
        getEnv('production')({
            production: 'test',
            default: 'default'
        }),
        'test'
    );

    t.is(
        getEnv('qa')({
            qa: 'test',
            default: 'default'
        }),
        'test'
    );
});
