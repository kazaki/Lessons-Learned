(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils'),
         crypto = require('crypto'),
         StreamSearch = require('streamsearch'),
         inspect = require('util').inspect,
         validator = require("email-validator");
    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function (server) {
        
        <!------------------------------------------------------------------ RENDERS ---------------------------------------------------------------------------------------------------->

        server.get('/', function (req, res) {
            res.render('index');
        });
        
        server.get('/home', function (req, res) {
            res.render('index');
        });
        
        server.get('/user_management', function (req, res) {
            res.render('index');
        });
        
        server.get('/users', function (req, res) {
            res.render('index');
        });
        
        server.get('/listll', function (req, res) {
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
console.log(user.password);
            database.confirmLoginByEmail(user)
                .then(function (user) {
                    console.log(user.token);
                    utils.encode(user.token)
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
            
            var email = req.body.email.toLowerCase();
            var pass = req.body.password;
            var name = req.body.name;

            console.log(email + pass + name);

            if(!validator.validate(email)){
                // Check if email is valid. 
                res.status(400).json({
                    message_class: 'error',
                    message: 'Email not valid.'
                });
            }

            else{

            database.insertUser(email, pass, name)
                .then(function (user_id) {
                    res.sendStatus(200);
                })
                .catch(function (err) {

                        // If the e-mail is already in use
                        if (err.sqlState == '23000') {

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

        server.delete("/api/deleteuser/:iduser",function(req,res){

            var iduser = req.params.iduser;

            console.log(iduser);

            database.deleteUserByID(iduser)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "No such user with that id."
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

        server.get('/api/searchlessons', function (req, res) {
            
                var keyword = req.params.keyword;

                database.getLessonByKeyword(keyword)
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Search by keyword ' + keyword + ' returned nothing.');
                    });
        });

        server.get('/api/lessonsByStatus', function (req, res) {
            
                var status = req.params.status;

                database.getLessonByStatus(status)
                   .then(function (lessons) {
                        res.status(200).send(lessons);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve LLs with that state.');
                    });
        });

         server.get("/lessons/:lesson_id",function(req,res){

             var lesson_id = req.params.lesson_id;

             database.getLessonByID(lesson_id)
               .then(function (lesson) {
                    res.status(200).send(lesson);
                })
                .catch(function (err) {
                    res.status(406).send('Could not retrieve LL information with that id.');
                });        
        });

         server.delete("/api/deletelesson/:idlesson",function(req,res){

             var idlesson = req.params.idlesson;

             console.log(idlesson);

             database.deleteLessonByID(idlesson)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {

                    console.log(err);

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "No such lesson with that id."
                    });

                });
         });

         server.put('/api/updatelessonfield/:idLesson', function (req, res) {

             var businessSector = req.body.businessSector.toLowerCase();
             var idLesson = req.params.idlesson;

                database.updateLessonFieldByID(businessSector,idLesson)
                    .then(function() {

                        res.status(200);
                    })
                    .catch(function (err) {

                        console.log(err);
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });

         });

         server.put("/api/updatelessontext/:idLesson",function(req,res){

                 var datetime = new Date();
                 var situation = req.body.situation;
                 var action = req.body.action;
                 var result = req.body.result;

                 var idLesson = req.params.idlesson;

                 database.updateLessonTextByID(action, situation, result, idLesson)
                    .then(function() {

                        res.status(200);
                    })
                    .catch(function (err) {

                        console.log(err);

                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });

         });

         server.post("/api/createlesson",function(req,res){

                var businessSector = req.body.businessSector;
                var dateCreated = new Date();
                var maker = req.body.maker;
                var project = req.body.project;

                var datetime = new Date();
                var situation = req.body.situation;
                var action = req.body.action;
                var result = req.body.result;

                var technology = req.body.technology;

                database.insertLesson(businessSector,dateCreated,maker,project,datetime,situation,action,result,technology)
                    .then(function (lesson) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        console.log('Error inserting lesson to database');
                        console.log(err);
                    
                    });
         });

         server.put("/api/updatelessonstate/:idLesson"), function(req, res){

             var state = req.body.state.toLowerCase();
             var idLesson = req.params.idlesson;

              if(state == 'draft' || state == 'submited' || state == 'approved' || state == 'inactive'){

                database.updateLessonStateByID(idLesson,state)
                    .then(function() {

                        res.status(200);
                    })
                    .catch(function (err) {

                        console.log(err);
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such lesson with that id."
                        });

                    });

             }

             else{
                res.status(406).json({
                            message_class: 'error',
                            message: "Incorrect state! Choose one of the following: draft|submited|approved|inactive."
                });
             }
        }  

        <!------------------------------------------------------------------ PROJECT ---------------------------------------------------------------------------------------------------->

        server.get('/api/projects', function (req, res) {
            
                database.getProjects()
                   .then(function (projects) {
                        res.status(200).send(projects);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve projects information');
                    });
        });

        server.post("/api/createproject",function(req,res){

                var type = req.body.type;
                var name = req.body.name;
                var manager = req.body.manager;

                var dateBeginning = req.body.dateBeginning;
                var dateEndExpected = req.body.dateEndExpected;

                var deliveringModel = req.body.deliveringModel;
                var numberConsultants = req.body.numberConsultants;

                database.insertProject(type,name,manager,dateBeginning,dateEndExpected,deliveringModel,numberConsultants)
                    .then(function (project) {
                        res.sendStatus(200);
                    })
                    .catch(function (err) {
                        // Sending the error to the log file
                        console.log('Error inserting project to database');
                        console.log(err);
                    
                    });
         });

        server.put("/api/updatedateProject/:idproject",function(req,res){

                 var date = req.body.date;

                 var idproject = req.params.idproject;

                 database.updateProjectDateByID(idproject,date)
                    .then(function() {

                        res.status(200);
                    })
                    .catch(function (err) {

                        console.log(err);
                        // Send the Response with message error
                        res.status(406).json({
                            message_class: 'error',
                            message: "No such project with that id."
                        });

                    });

         });

        <!------------------------------------------------------------------ Technologies ---------------------------------------------------------------------------------------------------->


        server.get('/api/technologies', function (req, res) {
            
                database.getTechnologies()
                   .then(function (techs) {
                        res.status(200).send(techs);
                    })
                    .catch(function (err) {
                        res.status(406).send('Could not retrieve technologies information');
                    });
        });


    };
} ());