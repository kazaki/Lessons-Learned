(function() {

    'use strict';

    var routes = require("./routes"),
        cookie = require("./utils");

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
               /*cookie.verifySession(req.cookies.session)
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
*/          
            }

            // END REGION: API permissions (logged)

        }
}
}());