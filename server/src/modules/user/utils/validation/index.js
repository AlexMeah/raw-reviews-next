module.exports = ({ username, password, email }) => {
    const errors = [];

    if (!username) {
        errors.push({
            key: 'username',
            msg: 'Username must not be empty.'
        });
    }

    if (!password) {
        errors.push({
            key: 'password',
            msg: 'Password must not be empty.'
        });
    }

    if (!email) {
        errors.push({
            key: 'email',
            msg: 'Email must not be empty.'
        });
    }

    if (email && !/^[^.@]+@[^.@]+?(?:\.[a-zA-Z0-9]+){1,2}$/.test(email)) {
        errors.push({
            key: 'email',
            msg: "Email isn't valid."
        });
    }

    return {
        errors: errors.length ? errors : false,
        values: {
            username,
            password,
            email
        }
    };
};
