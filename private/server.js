var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var expressValidator = require('express-validator')
var md5 = require('MD5');


var rest = require("./REST.js");

var app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
       connectionLimit : 50,
        waitForConnection: true,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'public',
        debug    :  false
    });
    self.configureExpress(pool);
}

REST.prototype.configureExpress = function(connection) {
      var self = this;

      var router = express.Router();

      app.use('/api', router);

      var rest_router = new rest(router,connection,md5);

      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err + " EXITING!");
    process.exit(1);
}

new REST();