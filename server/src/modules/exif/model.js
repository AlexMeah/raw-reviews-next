module.exports = (sequelize, DataTypes) => {
    const Exif = sequelize.define(
        'exif',
        {
            beforeExif: DataTypes.JSONB,
            afterExif: DataTypes.JSONB
        },
        {
            classMethods: {
                associate: models => {
                    Exif.Edit = Exif.belongsTo(models.edit);
                }
            }
        }
    );

    return Exif;
};
