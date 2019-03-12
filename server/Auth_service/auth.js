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

/*  Cost factor variable - number of rounds used to generate the salt.
    Cost factor should be different for normal users VS admins.
    Admins cost factor should be around 14
    @Todo read from elsewhere and not pre-defined
*/
const cost_factor = 12;


// Given a userID and a password, update hash in the database with the newly hashed password. Returns a boolean indicating operational outcome (success/failure)
function update_hash(userID, password) {  // Synchronous to the function caller
    try {
        const hash_string = await bcrypt.hash(password, cost_factor);
        return await db.update_hash(userID, hash_string);
    } catch (err) {
        console.error(err);
    }
}
// Async Update_hash function that returns a promise to the function caller
const update_hash = (userID, password) =>
    new Promise((resolve, reject) => {
        bcrypt.hash(password, cost_factor)
            // Calling then with the calculated hashstring for the given password
            .then((hash_string) => db.update_hash(userID, hash_string))
            // If the DB update_hash method returned correctly, resolve with the result
            .then(resolve)
            // If the hashing failed or if the DB update_hash method failed, call reject
            .then(reject);  // Error Catching will be handled by the function caller
    });



// Given a userID and a password, verify credentials and return a boolean indicating result
async function verify(userID, password) {
    return await bcrypt.compare(password, db.get_hash(userID));
}
async function verify(userID, password) {
    try {
        const hash_from_db = await db.get_hash(userID);
        return await bcrypt.compare(password, hash_from_db);
    } catch (err) {
        // Log the error
        // Return fail to the user

        /* The only way that this catch block will be entered is if the database throws an error */
    }
}
// Arrow function version of the above function
const verify = async (userID, password) => await bcrypt.compare(password, db.get_hash(userID));