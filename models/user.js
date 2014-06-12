/**
 * Created by peter on 14. 5. 5.
 */

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING
    }, {
        tableName: 'user',
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Task);
            }
        }
    });

    return User;
}