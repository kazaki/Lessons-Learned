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

        connection.query("INSERT INTO altran_db.users set ? ", data, function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }

        });
    });

    router.get("/users",function(req,res){

        var query = "SELECT * FROM altran_db.users";
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

        var query = "SELECT * FROM users WHERE iduser = ? ";
        var table = ["users","iduser",req.params.user_id];
        process.stdout.write("hello: " + req.params.user_id);

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

     router.put("/users",function(req,res){

        var query = "UPDATE users SET ? WHERE email = ?";

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

        var query = "DELETE from users WHERE email = ?";
        var table = ["users","email",req.params.email];

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

        /*var query;

        //get data
        var data = {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
         };

         process.stdout.write("hello: " + req.body.name);

        connection.query("INSERT INTO altran_db.users set ? ", data, function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }

        });*/
    });

    router.get("/lessons",function(req,res){

        var query = "SELECT * FROM altran_db.lessonsLearned";
        var table = ["lessonsLearned"];

        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }

        });
    });
}

module.exports = REST_ROUTER;