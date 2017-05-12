const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const config = require('../../config');

let client;

if (config.redis && process.env.NODE_ENV === 'production') {
    client = redis.createClient(config.redis);
}

module.exports = {
    set(key, value, expiry = 1) {
        let _value = value;

        if (client) {
            if (typeof value !== 'string') {
                _value = JSON.stringify(value);
            }

            client.set(key, _value, 'EX', expiry);
        }
    },
    del(key) {
        if (client) {
            client.del(key);
        }
    },
    delPattern(pattern) {
        if (client) {
            return client.keysAsync(pattern).then(keys => client.delAsync(keys));
        }

        return Promise.resolve();
    },
    get(key) {
        if (!client) {
            return Promise.resolve(null);
        }

        return client
            .getAsync(key)
            .then(val => {
                try {
                    return JSON.parse(val);
                } catch (_) {
                    return val;
                }
            })
            .catch(() => null);
    },
    client
};
