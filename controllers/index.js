
/*
 * GET home page.
 */
module.exports = function(app) {
   app.get('/', function(req, res) {
       res.render('index.html');
       //res.render('index.html', { title: 'Express' });
   });
   app.get('/index', function(req, res) {
        res.render('index', { title: 'Express' });
    });
};
