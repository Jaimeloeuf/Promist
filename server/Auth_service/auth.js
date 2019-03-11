'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    Module that exports functions to verify user credentials against those stored in the DB
    
    High level Functions needed:
    - Password verification against the has from database
    - Create Hash from password and store in Database to update when user changes password

    Smaller functions:
    - Get password hash from DB given userID
    - Password verification against given hash
    - Password to hash given password
    - Write password hash to DB given userID


    The method used is update hash and not set hash because, when a new user entry is
    created, it is created with a default null password, which should be then updated
    with the update_hash method.

    Construct the smaller functions first and compose the higher level functions with them
*/

const bcrypt = require('bcryptjs');
// Import in DB methods for reading and updating password hash from the db module
const { get_hash, update_hash } = require('./db/db');


// Variable that defines number of rounds used to generate the salt. To be read from elsewhere instead of being pre-defined
const salting_rounds = 10;

function create_hash(password) {
    // Auto-gen a salt and hash:
    bcrypt.hash(password, 10)
        .then((hash_string) => db.update_hash(userID, hash_string))
        .catch(console.error);

        // const composer = (f1) => (f1) => (val) => f1(f2(val));
        // composer(db.update_hash)(get_user)(userID);

    // Call the DB to store this password

    try {

    } catch (err) {
        // Let error bubble up to the route handler
    }
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


/* All code below this block comment are example codes */

// To hash a password
bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});

// Auto-gen a salt and hash:
bcrypt.hash('bacon', 8, function (err, hash) {
});

// example code using promises based API
bcrypt.hash(password, 10)
    .then(console.log)
    .catch(console.error);

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