var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var expressValidator = require('express-validator');
var morgan = require('morgan');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var rest = require("./REST.js");

var permissions = require("./permissions.js");

var port = 3000;

var app  = express();


function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        waitForConnection: true,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'public',
        debug    :  false
    });
    self.configuration(pool);
}

REST.prototype.configuration = function(connection) {
      var self = this;

      app.use(morgan('combined')); //logger
      app.use(bodyParser.json());  
      app.use(bodyParser.urlencoded({  
      extended: true  
      }));  

      var router = express.Router();

      app.use(permissions);

      app.use('/api', router);

      var rest_router = new rest(router,connection);

      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(port,function(){
          console.log("All right ! I am alive at Port: " + port + ".");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err + " EXITING!");
    process.exit(1);
}

new REST();