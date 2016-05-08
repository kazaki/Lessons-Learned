(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils'),
         crypto = require('crypto'),
         validator = require("email-validator");
    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function (server) {
        
        <!------------------------------------------------------------------ RENDERS ---------------------------------------------------------------------------------------------------->

        server.get('/', function (req, res) {
            res.render('index');
        });
        
        server.get('/user_management', function (req, res) {
            res.render('index');
        });
        
        // Route to send forbidden view
        server.get('/forbidden', function (req, res) {
            res.render('index');
        });
        
         <!------------------------------------------------------------------ USERS ---------------------------------------------------------------------------------------------------->
        
        server.get('/api/users', function (req, res) {
            
            database.getUser()
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve users information');
                });

        });

        server.get("/users/:user_id",function(req,res){

            database.getUserByID()
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve users information');
                });
        
        });

        server.post('/api/login', function (req, res) {
            
            var user = {
                email: req.body.email.toLowerCase(),
                password: req.body.password
            };

            database.confirmLoginByEmail(user)
                .then(function (user) {

                    jwt.encode(user.token)
                        .then(function (encoded) {
                            res.status(200).json(encoded);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });

                })
                
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "Username or password invalid."
                    });

                });

        });

        server.post('/api/createuser', function (req, res) {
            
            var email = req.body.email;
            var pass = req.body.password;
            var name = req.body.name;

            console.log(email + pass + name);

            if(!validator.validate(email.toLowerCase())){
                // Check if email is valid. 
                res.status(400).json({
                    message_class: 'error',
                    message: 'Email not valid.'
                });
            }

            else{

            database.insertUser(req.body.email.toLowerCase(), req.body.password,name)
                .then(function (user_id) {
                    res.sendStatus(200);
                })
                .catch(function (err) {

                        // If the e-mail is already in use
                        if (err.code == '23505') {

                            // Send the Response with message error
                            res.status(406).json({
                                message_class: 'error',
                                message: "Email already in use."
                            });

                        } else {

                            // Sending the error to the log file
                            console.log('@authRouter.js: Error inserting user to database');
                            console.log(err);

                        }
                    });
            }
        });

        server.delete("/api/deleteuser/:email",function(req,res){

            var email = req.params.email.toLowerCase();

            console.log(email);

            database.deleteUserByEmail(email)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "No such user with that email."
                    });

                });
        });


        server.put("/api/updateuseremail",function(req,res){

         var email = req.body.email.toLowerCase();
         var name = req.body.name;
         var password = req.body.password;
         var newpassword = req.body.newpassword;

            database.checkPasswordbyEmail(email, password)
                .then(function(){    
                database.updateUserByEmail(name,newpassword,email)
                    .then(function() {

                        res.status(200);

                    })
                    .catch(function (err) {

                        console.log('shiiit' + err);

                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such user with that email."
                        });

                    });
             }) 
             .catch(function (err) {

                        console.log('HELLOOO' + err);

                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "Wrong Password."
                        });

                    });      
        });

         <!------------------------------------------------------------------ LESSONS ---------------------------------------------------------------------------------------------------->

         server.get('/api/lessons', function (req, res) {
            
                database.getLessons()
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve LL information');
                    });
        });

         server.get("/lessons/:lesson_id",function(req,res){

             database.getLessonByID()
               .then(function (lesson) {
                    res.status(200).send(lesson);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve LL information');
                });        
        });

         <!------------------------------------------------------------------ TODO ---------------------------------------------------------------------------------------------------->

         server.delete("/api/deletelesson/:idlesson",function(req,res){
        });

         server.put('/api/updatelessonfield', function (req, res) {

         });

         server.put("/api/updatelessontext",function(req,res){

         });

         server.post("/api/createlesson",function(req,res){
         });
    };

} ());