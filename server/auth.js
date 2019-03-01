'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	
*/

const bcrypt = require('bcryptjs');

// To hash a password
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

// Auto-gen a salt and hash:
bcrypt.hash('bacon', 8, function(err, hash) {
});

/* To check a password: */
// Load hash from your password DB.
bcrypt.compare("B4c0/\/", hash, function(err, res) {
    // res === true
});
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false
});
 
// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("B4c0/\/", hash).then((res) => {
    // res === true
});