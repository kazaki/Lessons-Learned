(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils'),
         crypto = require('crypto');
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
                            res.status(200).send(user);
                            console.log(user);
                        })
                        .catch(function (err) {
                            res.status(406).send(err);
                        });
               /* })
                .catch(function () {
                    res.status(406).send('Could not verify session');
                });*/
        });
        
        server.post('/api/authenticate', function (req, res) { 
                    /*
                   var pass = crypto //protect from rainbow table attacks
                    .createHmac("md5",utils.key)
                    .update(req.body.password)
                    .digest('hex');
                    */
                   var user = {
                        email: '123@123.com',
                        password: '123456'
                    };
                   database.confirmLoginByEmail(user)
                       .then(function (us) {
                           utils.encode(us.token)
                            .then(function (encoded) {
                                res.status(200).json(us); 
                            })
                            .catch(function (err) {
                                console.log('@authRouter.js: Error encoding user_id for a cookie');
                                console.log(err);
                            })
                           
                       })
                       .catch(function (err) {
                           console.log(err);
console.log("olaaa99999999999"); 
                            // Send the Response with message error
                             res.status(406).json({
                                message_class: 'error',
                                message: "Username or password invalid."
                            });
                            console.log("olaaa10"); 
                       });
        });
       

    };

} ());