var jwt = require('jsonwebtoken');

module.exports = {

    'secret': 'jmvhDdDBMvqb=M@6h&QVA7x',

    'key': 'saoisvesHdLLAJrB6T',

    'algorithm': 'md5',

    'hmac': 'SHA256',

  // Function to encode an object to a string
  encode:function (decoded, key) {
    return new Promise(function (resolve, reject) {
      var encoded = jwt.sign(decoded, key);
      resolve(encoded);
    });
  },

  // Function to decode an encoded string to an object (doesn't verify if the encoded string is valid)
  decode:function (encoded) {
    return new Promise(function (resolve, reject) {
      var decoded = jwt.decode(encoded);
      resolve(decoded);
    });
  },

  // Function to verify if the encoded string is valid
  verify:function (encoded,key) {
    return new Promise(function (resolve, reject) {
      jwt.verify(encoded, key, function (err, decoded) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },

  verifySession:function (cookie) {
        return new Promise(function (resolve, reject) {
            jwt.verify(cookie)
                .then(function (token) {
                   var query = "SELECT * FROM public.users WHERE token = ? ";

                    query = mysql.format(query,token);

                    connection.query(query,function(err,rows){})
                        .then(function (rows) {
                            resolve(rows[0].id);
                        })
                        .catch(function (err) {
                            reject(err);
                        });
                })
                .catch(function (err) {
                    reject(err);
                });
        });

    }

};