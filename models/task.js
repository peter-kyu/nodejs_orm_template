/**
 * Created by peter on 14. 5. 5.
 */

module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
        title: DataTypes.STRING
    }, {
        tableName: 'task',
        classMethods: {
            associate: function(models) {
                Task.belongsTo(models.User);
            }
        }
    });

    return Task;
}