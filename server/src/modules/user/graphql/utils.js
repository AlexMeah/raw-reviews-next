const secureFields = [
    'email',
    'password',
    'validationToken',
    'confirmed',
    'createdAt',
    'updatedAt'
];

module.exports = {
    filterSecure(options, args, context) {
        console.log('jhbhjbh');
        return Object.assign(options, {
            attributes: options.attributes.filter(attr => {
                if (context.user && context.user.username === args.username) {
                    return true;
                }

                return secureFields.indexOf(attr) === -1;
            })
        });
    }
};
