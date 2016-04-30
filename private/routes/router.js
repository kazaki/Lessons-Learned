(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils');
    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function (server) {
        
        // Route to send landing view
        server.get('/', function (req, res) {
            res.render('index');
        });
        // Route to send forbidden view
        server.get('/forbidden', function (req, res) {
            res.render('index');
        });
        
        
        server.get('/api/user/', function (req, res) {
            //utils.verifySession(req.cookies.session)
                //.then(function (userId) {
                    database.getUser()
                        .then(function (user) {
                            res.status(200).send("done");
                        })
                        .catch(function (err) {
                            res.status(406).send('Could not retrieve user information');
                        });
               /* })
                .catch(function () {
                    res.status(406).send('Could not verify session');
                });*/
        });
       

    };

} ());