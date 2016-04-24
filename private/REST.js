var mysql = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

    router.get("/",function(req,res){

    	res.json({"Message" : "Hello World !"});
    });

    router.post("/users",function(req,res){

        var query;

        //get data
        var data = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
         };

         process.stdout.write("hello: " + req.body.name);

        connection.query("INSERT INTO public.users set ? ", data, function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
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
        
        //process.stdout.write("hello: " + req.params.user_id);

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

        var query = "UPDATE public.users SET ? WHERE email = ?";

        var table = ["users","password",md5(req.body.password),"email",req.body.email];

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
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