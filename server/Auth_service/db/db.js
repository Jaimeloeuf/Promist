'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    Fake demo DB implementation
    Module that exposes interface to interact with a fake demo in memory Database
    
    @Todo
    - 
*/

// User DB will be a object, to simulate a key-value pair store or Document DB
const userDB = {
    user1: {
        username: 'Jaime',
        hash: 'uoouoio' // Assuming hash is a BCrypt hash with salt built into the hash
    },
    user2: {

    },
    user3: {

    },
    user4: {

    }
};

// Get user object given a userID
function get_user(userID) {
    return new Promise((resolve, reject) => {
        if (userDB[userID])
            return resolve(userDB[userID]);
        else
            return reject(new Error('ERR: User does not exist'));
    });
}



module.exports = {
    get_user
}