
/*
 * GET home page.
 */
module.exports = function(app) {
   /*
   app.get('/', function(req, res) {
       res.render('index.html');
   });
   */
   app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });
};
