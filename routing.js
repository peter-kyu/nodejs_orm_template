/**
 * this file is for including all controller files automatically.
 * it will be called by app.js when it starts up
 *
 * controller files must be placed under controllers directory.
 */

var fs = require('fs');

module.exports = function(app) {
    var basedirname = __dirname + '/controllers';
    fs.readdirSync(basedirname).forEach(function(name){
        var filePath = basedirname + '/' + name;
        if (fs.statSync(filePath).isFile()) {
            var routes = require(filePath);
            routes(app);
        } else {
            console.log('only File can be required as controllers (this file will be skipped) : ' + filePath);
            return;
        }
    });
};
