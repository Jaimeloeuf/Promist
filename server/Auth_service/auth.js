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



/*  Function verifies a given set of credentials to return a promise that
    Resolves with the user object if verified to be correct
    Rejects with 'ERR: Wrong password' if the password was invalid
    Rejects with error code from async function calls if either the DB or BCrypt action fails.
*/
const verify_credentials = async (userID, password) =>
    new Promise((resolve, reject) => {
        try {
            // Get the whole user object from the DB
            const user = await db.get_user(userID);
            // If the password is correct, return the user Object
            if (await bcrypt.compare(password, user.userID))
                return resolve(user);
            else
                return reject('ERR: Wrong password'); // Reject with error


            // Below is the old method, which only verifies if the password is correct
            // const hash_from_db = await db.get_hash(userID);
            // return await bcrypt.compare(password, hash_from_db);

            // Single line call of the above old method
            // return await bcrypt.compare(password, await db.get_hash(userID));
        } catch (err) {
            // If the database throws an error or if Bcrypt throws error when comparison fails

            // Log the error, either to log file or to logging service

            // Reject with the error
            return reject(err);
        }
    });


module.exports = {
    verify_credentials,
}