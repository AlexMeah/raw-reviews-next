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
        return Object.assign(options, {
            attributes: options.attributes.filter(attr => {
                if (context.user && context.user.id === args.id) {
                    return true;
                }

                return secureFields.indexOf(attr) === -1;
            })
        });
    }
};
