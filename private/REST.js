var mysql = require("mysql");
var Promise = require('bluebird');
var crypto = require('crypto');
var assert = require('assert');

var config = require("./utils.js");


function REST_ROUTER(router,connection) {
    var self = this;

    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

    router.get("/",function(req,res){

        res.json({"Message" : "Hello World !"});
    });

    router.post("/authenticate",function(req,res){

        var email = req.body.email;
        var pass = crypto //protect from rainbow table attacks
        .createHmac("md5",config.key)
        .update(req.body.password)
        .digest('hex');

        var query = "SELECT * FROM public.users WHERE email = ? ";

        query = mysql.format(query,email);

        connection.query(query,function(err,rows){

            if(err) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else {

                if(rows[0].password != pass){

                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    
                } else {

                config.encode(rows[0].token,config.key).then(function(encode) {
                    res.json({ success: true, message: 'User authenticated successfuly with email: ' + email +"." });
                })
                .catch(function (err){
                    console.log(err);
                    res.json({ success: false, message: 'Authentication failed!'});
                });
                }
            }
        });
    });

    router.post("/users",function(req,res){

        var query;
        var unhashedPassword = req.body.password;
        //get user data
        var user = {
        	email:req.body.email,
            name:req.body.name,
            token:crypto.randomBytes(20).toString('hex')
         };

       	user.password = crypto //protect from rainbow table attacks
        .createHmac("md5",config.key)
        .update(unhashedPassword)
        .digest('hex');

        connection.query("INSERT INTO public.users set ? ", user, function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                process.stdout.write("ERRO: " + err);
            } else {
                res.json({"Error" : false, "Message" : "User Added !", user: user
                });
            }

        });
    });

    router.get("/users",function(req,res){
        
        var query = "SELECT * FROM public.users";
        var table = ["users"];

        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }

        });
    });

    router.get("/users/:user_id",function(req,res){

        var user_id = req.params.user_id;

        var query = "SELECT * FROM public.users WHERE idusers = ? ";
        
        process.stdout.write("hello: " + req.params.user_id);

        query = mysql.format(query,user_id);

        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    
    router.put("/users",function(req,res){

        var query = "UPDATE public.users SET password = ? WHERE email = ?"; //FALTA VER SE A PASS TA BEM?

		var newpass = crypto //protect from rainbow table attacks
        .createHmac("md5",config.key)
        .update(req.body.password)
        .digest('hex');

        var table = [newpass,req.body.email];

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){

            if(err) {
            	console.log(err);
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+ req.body.email});
            }

        });
    });

    router.delete("/users/:email",function(req,res){

        var query = "DELETE from public.users WHERE email = ?";
        var table = req.params.email;

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }

        });
    });

    router.post("/lessons",function(req,res){

        var query;

        //get data
        var data1 = {
            buisnessSector:req.body.buisnessSector,
            dateCreated:req.body.dateCreated,
            maker:req.body.maker,
            project:req.body.id
         };

        connection.query("INSERT INTO public.lessonslearned set ? ", data1, function(err1,rows1){

            if(err1) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }

        });

        connection.query("INSERT INTO public.lessonstext set ? ", data2, function(err2,rows2){

        var data2 = {
            idLessonLearned:rows.insertId,
            situation:req.body.situation,
            action:req.body.action,
            result:req.body.result
         };

            if(err2) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }

        });
    });

    router.get("/lessons",function(req,res){

        var query = "SELECT * FROM public.lessonsLearned as t1, public.lessonstext as t2 where t1.idLessonsLearned = t2.idLessonLearned";

        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }

        });
    });

    router.get("/lessons/:lessons_id",function(req,res){

        var lessons_id = req.params.lessons_id;

        var query = "SELECT * FROM public.lessonsLearned as t1, public.lessonstext as t2 WHERE t1.idLessonsLearned = ? AND t2.idLessonLearned = ?";

        query = mysql.format(query,lessons_id, lessons_id);

        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.put("/lessons",function(req,res){

        var query = "UPDATE public.lessonslearned SET ? WHERE idLessonsLearned = ?";

        var table = ["lessonslearned","buisnessSector",req.body.buisnessSector,"maker",req.body.maker];

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }

        });
    });

    router.put("/lesson",function(req,res){

        var query = "UPDATE public.lessonstext SET ? WHERE idLessonLearned = ?";

        var table = ["lessonstext","dateUpdated",req.body.dateUpdated,"situation",req.body.situation,"action",req.body.action,"result",req.body.result];

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }

        });
    });

    router.delete("/lessons/:lessons_id",function(req,res){

        var query = "DELETE from public.lessonslearned WHERE idLessonsLearned = ?";
        var table = req.params.lessons_id;

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }

        });
    });
}



module.exports = REST_ROUTER;