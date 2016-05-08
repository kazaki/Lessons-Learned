(function() {

    'use strict';
    var Promise = require('bluebird'), 
        mysql = require("mysql"),
        crypto = require('crypto'),
        bcrypt = require('bcrypt-nodejs'),
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
                    reject('Error creating pool for the database!');
                }
                else{
                    resolve();
                }
        });
    }
    
    <!------------------------------------------------------------------------------------------------ USERS ------------------------------------------------------------->
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

    exports.getUserByID = function(idusers){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE idusers = ?";
         query = mysql.format(query,idusers);
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
 
    exports.checkPasswordbyEmail = function(email, password){
         return new Promise(function (resolve, reject) {
         client.query('SELECT password FROM users WHERE ?', {email: email},
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(result[0].password);
                        console.log(password);
                        bcrypt.compare(password, result[0].password, function (err, res) {

                            if (err) {
                                console.log('adada');
                                reject(err);
                            } else if (res) {
                                console.log('NICE');
                                resolve();
                                
                            } else{
                                console.log('CRA*');
                                reject('Wrong password.');
                            }
                        });
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
                            reject('No users found with such email.');
                        }
                    }
                });   
         });
    }   

    exports.insertUser = function (email, password,name) {
        return new Promise(function (resolve, reject) {
            console.log('CARALHO');
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    console.log('CARALHO');
                    reject(err);
                } else {
                    crypto.randomBytes(20, function (err, buf) {
                        if (err) {
                            console.log('fuck');
                            reject(err);
                        } else {
                            client.query('INSERT INTO public.users SET ?', {email: email, name: name, password: hash, token: buf.toString('hex')},
                                function (err, result) {
                                    if (err) {
                                        console.log('fuck');
                                        reject(err);
                                    } else {
                                        console.log('fds');
                                        resolve(result.insertId);
                                    }
                                });
                        }
                    });
                }
            });
        });
    }
  
    exports.updateUser = function(email){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.users SET ? WHERE email = ?', [{name: name, password: hash, token: buf.toString('hex')}],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Deleted User with email: ' + email);
                    }
                });   
         });
    }

    exports.deleteUserByEmail = function(email){
         return new Promise(function (resolve, reject) {
         var query = "DELETE from public.users WHERE email = ?";

            query = mysql.format(query,email);

            client.query(query,function(err,result){
                        if (err) {
                            console.log(email);
                            reject(err);
                        } else {
                            resolve('Deleted User');
                        }
                    });   
             });
    }
    
      // Function to update a user email
    exports.updateUserByEmail = function (name, hashedpass, email) {
        return new Promise(function (resolve, reject) {
            console.log('suuup' + hashedpass);
        bcrypt.hash(hashedpass, null, null, function (err, hash) {
            console.log('suuup' + hashedpass);
            client.query('UPDATE public.users SET name = ?, password = ? WHERE email = ?',  [name, hash ,email ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated user with email: ' + email);
                    }
                });
            });
        });
    }


    <!------------------------------------------------------------------------------------------------ Lessons ------------------------------------------------------------->

    exports.getLessons = function(){
         return new Promise(function (resolve, reject) { 
         var query = "SELECT * FROM public.lessonsLearned as t1, public.lessonstext as t2 where t1.idLessonsLearned = t2.idLessonLearned";
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

    exports.getLessonByID = function(idlesson){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.lessonsLearned as t1, public.lessonstext as t2 WHERE idLessonsLearned = ? AND t1.idLessonsLearned = t2.idLessonLearned";
         query = mysql.format(query,idlesson);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });   
         });
    }

}());

