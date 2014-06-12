
/*
 * GET users listing.
 */
var db = require('../models');

module.exports = function(app) {
    app.get('/user', function(req, res) {
        db.User.create({username: 'kyu'}).success(function(user) {
            console.log('create new user successfully : ' + user);
        })
        db.User.findAll().success(function(items) {
            res.send(items);
        })
    });
};
