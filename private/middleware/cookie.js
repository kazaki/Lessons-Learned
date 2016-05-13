(function(){
    
      'use strict';

    var Promise = require('bluebird'),
        jwt = require('./utils'),
        database = require('../database/database');
        
      exports.verifySession=function (cookie) {
        return new Promise(function (resolve, reject) {
            jwt.verify(cookie)
                .then(function (token) {
                    database.getUserByToken(token)
                        .then(function (rows) {
                            console.log("ola1");
                            resolve(rows);
                        })
                        .catch(function (err) {
                            console.log("ola");
                            reject(err);
                        });
                })
                .catch(function (err) {
                    console.log("ola3");
                    reject(err);
                });
        });

    }
}());