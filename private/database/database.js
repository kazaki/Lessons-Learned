(function() {

    'use strict';
    var mysql = require("mysql"),
        Promise = require('bluebird'),
        bcrypt = require('bcryptjs'),
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
                        resolve(result);
                    }
                });   
         });
    }
    
    exports.getUserByToken = function(token){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE token = ?";
         query = mysql.format(query,token);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });   
         });
    }
 
    exports.getUserByEmail = function(email){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE email = ?";
         query = mysql.format(query,email);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.id);
                    }
                });   
         });
    }   
    exports.confirmLoginByEmail = function(user){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE email = ?";
         query = mysql.format(query,user.email);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            bcrypt.compare(user.password, result[0].password,
                                function (err, res) {
                                    if (err) {
                                        reject(err);
                                    } else if (res === true) {
                                        delete result[0]._password;
                                        resolve(result[0]);
                                    } else if (res === false) {
                                        reject('Incorrect password.');
                                    }
                                });
                        } else {
                            reject('@database.js (getuseridbyemail): No results found.');
                        }
                    }
                });   
         });
    }   
    
}());

