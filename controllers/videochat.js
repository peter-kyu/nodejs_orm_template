module.exports = function(app) {
    app.get('/videochat', function(req, res) {
        res.render('videochat');
    });
};
