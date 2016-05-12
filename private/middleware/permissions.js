(function() {

    'use strict';

    var routes = require("./routes"),
        cookie = require("./cookie");

    module.exports = function(req, res, next) {
        var i;

        if (req.url.split('/')[1] == 'api') {

            // START REGION: API permissions (all)
            for (i = 0; i < routes.api.all.length; i++) {
                if (routes.api.all[i].indexOf(req.url) > -1) {
                    break;
                }
            }
            if (i != routes.api.all.length) {
                next();
            } else {
                // END REGION: API permissions (all)

                // START REGION: API permissions (logged)
               cookie.verifySession(req.cookies.session)
                    .then(function (userId) {
                        for (i = 0; i < routes.api.logged.length; i++) {
                            if (req.url.indexOf(routes.api.logged[i]) > -1) {
                                break;
                            }
                        }

                        if (i == routes.api.logged.length) {
                            return res.sendStatus(403);
                        } else {
                            console.log('shit');
                            next();
                        }

                    })
                    .catch(function (err) {
                        return res.sendStatus(403);
                    });
          
            }

            // END REGION: API permissions (logged)

        }
        else {
            
            cookie.verifySession(req.cookies.session)
                .catch(function (err) {
                    if (res.statusCode == null) {
                        res.redirect('/forbidden');
                    }
                });

             // START REGION: Views permissions (all)

            for (i = 0; i < routes.views.all.length; i++) {
                if (routes.views.all[i].indexOf(req.url) > -1) {
                    break;
                }
            }

            if (i != routes.views.all.length) {
                next();
            } else {

                // END REGION: Views permissions (all)

                // START REGION: Views permissions (logged)

                cookie.verifySession(req.cookies.session)
                    .then(function (userId) {

                        for (i = 0; i < routes.views.logged.length; i++) {
                            if (req.url.indexOf(routes.views.logged[i]) > -1) {
                                break;
                            }
                        }

                        if (i == routes.views.logged.length) {
                            if (res.statusCode == null) {
                                res.redirect('/forbidden');
                            }
                        } else {
                            next();
                        }

                    })
                    .catch(function(err){
                         res.redirect('/forbidden');
                    });

            }

            // END REGION: Views permissions (logged)

        

        }
}
}());