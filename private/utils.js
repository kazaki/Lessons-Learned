module.exports = {

    'secret': 'jmvhDdDBMvqb=M@6h&QVA7x',

    'key': 'saoisvesHdLLAJrB6T',

    'algorithm': 'md5',

    'hmac': 'SHA256',

    validateToken: function(req, res, next) {
    

    	var token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
        if (token) {

          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;    
              next();
            }
          });

        } else {

          // if there is no token
          // return an error
          return res.status(403).send({ 
              success: false, 
              message: 'No token provided.' 
          });
    
        }
  }

};