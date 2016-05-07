(function (){
var jwt = require('jsonwebtoken'),
    database = require('../database/database');


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
          console.log("........");
            jwt.verify(cookie)
                .then(function (token) {
                    database.getUserByToken(token)
                        .then(function (rows) {
                          console.log(token);
                            resolve(rows.id);
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
}());