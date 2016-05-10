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
                            resolve('Deleted User by Email.');
                        }
                    });   
             });
    }

    exports.deleteUserByID = function(iduser){
         return new Promise(function (resolve, reject) {
         var query = "DELETE from public.users WHERE idusers = ?";

            query = mysql.format(query,iduser);

            client.query(query,function(err,result){
                        if (err) {
                            console.log(iduser);
                            reject(err);
                        } else {
                            resolve('Deleted User by ID.');
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
         var query = "SELECT * FROM public.lessonsLearned as t1, public.lessonstext as t2, public.technologies as t3 WHERE t1.idLessonsLearned = t2.idLessonLearned AND t1.idLessonsLearned = t3.idLessonsLearned";
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
         var query = "SELECT * FROM public.lessonsLearned as t1, public.lessonstext as t2, public.technologies as t3 WHERE t1.idLessonsLearned = ? AND t1.idLessonsLearned = t2.idLessonLearned AND t1.idLessonsLearned = t3.idLessonsLearned";
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

    exports.getLessonByStatus = function(status){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.lessonsLearned WHERE status = ? ";
         query = mysql.format(query,status);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });   
         });
    }

    exports.getLessonByKeyword = function(keyword){
         return new Promise(function (resolve, reject) {
         var searchit = '%' + keyword +'%';
         var query = "SELECT t1.maker,t1.project,t1.status,t1.dateCreated FROM public.lessonsLearned as t1, public.lessonstext as t2 WHERE t1.idLessonsLearned = ? AND t1.idLessonsLearned = t2.idLessonLearned AND (t2.situation Like ? OR t2.action LIKE ? OR t2.result LIKE ?)";
         query = mysql.format(query,idlesson,searchit,searchit,searchit);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });   
         });
    }

    exports.deleteLessonByID = function(iduser){
         return new Promise(function (resolve, reject) {
         var query = "DELETE from public.lessonsLearned WHERE idLessonsLearned = ?";

            query = mysql.format(query,iduser);

            client.query(query,function(err,result){
                        if (err) {
                            console.log(iduser);
                            reject(err);
                        } else {
                            resolve('Deleted User by ID.');
                        }
                    });   
             });
    }

    exports.updateLessonFieldByID = function (businessSector, idLesson) {
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.lessonsLearned SET businessSector = ? WHERE idLesson = ?',  [businessSector, idLesson ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated lesson with id: ' + idLesson);
                    }
                });
        });
    }

    exports.updateLessonTextByID = function (action, situation, result, idLesson) {
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.lessonstext SET situation = ?, result = ?, action = ? WHERE idLesson = ?',  [action, situation, result, idLesson ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated lesson fields for the lesson with id: ' + idLesson);
                    }
                });
        });
    }

    exports.updateLessonTechByID = function (technology, idLesson) {
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.technologies SET technology = ? WHERE idLessonsLearned = ?',  [technology, idLesson ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated lessons tech for the lesson with id: ' + idLesson);
                    }
                });
        });
    }

    exports.insertLesson = function (businessSector,dateCreated,maker,project,datetime,situation,action,result,technology) { 
        return new Promise(function (resolve, reject) {

                client.query('INSERT INTO public.lessonsLearned SET ?', {businessSector: businessSector, dateCreated: dateCreated, maker: maker, project: project},
                    function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                                client.query('INSERT INTO public.lessonstext SET ?', {idLessonLearned: result.insertId, datetime: datetime, situation: situation, action: action, result: result},
                                    function (err2, result2) {
                                        if (err2) {
                                            reject(err2);
                                        } else {
                                            client.query('INSERT INTO public.technologies SET ?', {idLessonsLearned: result.insertId, technology: technology},
                                                    function (err3, result3) {
                                                        if (err3) {
                                                            reject(err3);
                                                        } else {

                                                        resolve(result.insertId);

                                                        }
                                                    });
                                            }
                                    });
                            }
                    });        
                });
    }

    exports.updateLessonStateByID = function(idlesson,state){
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.lessonsLearned SET status = ? WHERE idLesson = ?',  [state, idLesson ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated lesson with id: ' + idLesson + 'to: ' + state);
                    }
                });
        });
    }

    <!------------------------------------------------------------------------------------------------ Project ------------------------------------------------------------->

    exports.getProjects = function(){
         return new Promise(function (resolve, reject) { 
         var query = "SELECT * FROM public.project";
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

    exports.insertProject = function (type,name,manager,dateBeginning,dateEndExpected,deliveringModel,numberConsultants) {
        return new Promise(function (resolve, reject) {

                client.query('INSERT INTO public.project SET ?', {type: type, name: name, manager: manager, dateBeginning: dateBeginning, dateEndExpected: dateEndExpected, deliveringModel: deliveringModel, numberConsultants: numberConsultants},
                    function (err, result) {
                        if (err) {
                            reject(err);
                        } else {

                        resolve(result.insertId);
                        }
                    });
                });
    }

    exports.updateProjectDateByID = function(idproject,date){
        return new Promise(function (resolve, reject) {
            client.query('UPDATE public.project SET dateEnd = ? WHERE idproject = ?',  [date, idproject ],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Updated project date of ending with id: ' + idproject + 'to: ' + date);
                    }
                });
        });
    }

    <!------------------------------------------------------------------------------------------------ Technology ------------------------------------------------------------->


    exports.getTechnologies = function(){
         return new Promise(function (resolve, reject) { 
         var query = "SELECT * FROM public.technologies";
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


}());

