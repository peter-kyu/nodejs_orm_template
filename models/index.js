/**
 * Created by peter on 14. 5. 5.
 */
var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    lodash = require('lodash'),
    config = require('config');
var sequelize = new Sequelize(config.database.default_schema,
        config.database.username,
        config.database.password, {
            dialect: config.database.type,
            port: config.database.port
        }),
    db = {};


fs.readdirSync(__dirname).
    filter(function(file) {
        return (file.indexOf('.') !== 0) && (file != 'index.js')
    }).
    forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});


module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
