'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Module that exports functions to verify user credentials against those stored in the DB
*/

const bcrypt = require('bcryptjs');

// To hash a password
bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});

// Auto-gen a salt and hash:
bcrypt.hash('bacon', 8, function (err, hash) {
});

/* To check a password: */
// Load hash from your password DB.
bcrypt.compare("B4c0/\/", hash, function (err, res) {
    // res === true
});
bcrypt.compare("not_bacon", hash, function (err, res) {
    // res === false
});

// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("B4c0/\/", hash).then((res) => {
    // res === true
});

/*  Functions needed:
    - Password verification against the has from database
    - Create Hash from password and store in Database
    - 
*/

function create_hash(password) {
    // Auto-gen a salt and hash:
    bcrypt.hash(password, 8, (err, hash) => {
        // Call the DB to store this password
    });
}

// Given a userID and a password, verify if password is correct
function verify(userID, password) {
    // Get the password hash of user with "userID" from the DataBase
    db.get_hash(userID);

    // Compare hash with hashed password and return result to the user
    bcrypt.compare(password, hash, (err, res) => {
        // res === true

        if (err)
            return false;
        return res;
    });
}