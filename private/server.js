(function () {
    var express = require("express"),
        database = require("./database/database"),
        bodyParser  = require("body-parser"),
        cookieParser = require('cookie-parser'),
        http = require('http'),
        morgan = require('morgan'),
        permissions = require("./middleware/permissions"),
        path = require('path'),
        port = 3000,
        server = express();


// Create connection to the database
database.connect()
        .then(function () {
            // Sending the error to the log file
            console.log('@server.js: Connected to database.');
        })
        .catch(function (err) {
            // Sending the error to the log file
            console.log('@server.js: Can\'t connect to database.');
            console.log(err);
        });
        
// Sets the folder where are the files are static
server.use(express.static(path.resolve(__dirname, '../public/')));

// Sets the folder where the views are
server.set('views', path.resolve(__dirname, '../public/'));

// Sets the view engine to HTML
server.set('view engine', 'html');
        
// Calls the router where all routes are called. This is done so the 'server.js' file is cleaner and more maintainable.
require('./routes/router')(server);

// Allows the server to read cookies
server.use(cookieParser());

// Allows the server to read JSON files
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());

// Outputs simple log information to the console.
server.use(morgan('dev'));

// Middleware to check if view requested is allowed to render
server.use(permissions);

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var sasa = http.createServer(handleRequest);

//Lets start our server
sasa.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
});

}());