(function() {

    'use strict';
    var mysql = require("mysql"),
        Promise = require('bluebird'),
        client;
                
    exports.connect = function(){
        return new Promise(function(resolve, reject) {
            client = mysql.createPool({
                    connectionLimit : 100,
                    waitForConnection: true,
                    host     : 'localhost',
                    user     : 'root',
                    password : 'root',
                    database : 'public',
                    debug    :  false
                });
                if(!client){
                    reject('Deu merda');
                }
                else{
                    resolve();
                }
        });
    }
    
    exports.getUser = function(){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users";
         query = mysql.format(query);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.rows[0]);
                    }
                });   
         });
    }
}());

