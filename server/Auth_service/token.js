'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This library module will handle the create/read/sign/verify operations on a given token
	This does not handle and authentication. Just token based Identity verification

    @TODO
    - Add a function to coerce Auth header to either all lower or upper case
    - Finnish writing the verification middleware
	- look into private Keys and stuff like Asymmetric signing and verifying
	- Create child processes too, to deal with the parsing and signing as it seems like it
      will take quite abit of CPU power
    - Start implementing JWEs
*/

// Dependencies
const { extract_token, create_token, verify } = require('./jwt');

// Variables used for signing/verifying tokens. Should be read from env or config file.
const expiresAfter = '100s';

/*
    Payload given to function should only contain private claims and should not hold any
    of the pre-registered interoperable claim names and values.

    User to specify the sign and verify options directly in this module for every service
    The OPTIONS MUST BE DEFINED, and they must be defined inside this module,
    thus for the jwt module, the signOptions can be the parameter for the first function
*/


// SIGNING OPTIONS
var signOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    // audience: 'https://Promist.io',
    audience: ['https://Promist.io', '.... all the services names'],
    expiresIn: "12h",
    algorithm: "RS256"
};

/* The sign and verify options for the token module of the Auth Service */
const signOption = { expiresIn: expiresAfter };
const verifyOption = {};


var verifyOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    // audience: 'https://Promist.io',
    audience: ['https://Promist.io', '.... all the services names'],
    algorithm: ["RS256"] // Unlike signOption that we used while signing new token , we will use verifyOptions to verify the shared token by client. The only difference is, here the algorithm is Array [“RS256”].
};

// Modify the create_token function by adding signOption object into new function's closure
create_token = create_token(signOption);
// Modify the create_token function by adding signOption object into new function's closure
verify = verify(verifyOption);

/*  Token verification middleware:
    To be passed in to the routes before the route handlers.
    If the token is invalid, it will secure the route by automatically ending the req/res cycle */
function v_mw(req, res, next) {
    // Middleware to call the verify function first to make sure JWT is valid

    if (!verify(token)) {
        // See what is the status code to respond with depending on
        // why the token is not valid.

        res.end();
    }
    next();
}


// This is a middleware function that can be used on routes that require JWT security
function get_token(req, res, next) {
    // Save token for subsequent functions to access token with request object after this middleware
    req.token = extract_token(req);
    // End the req/res cycle if no token is sent
    if (typeof req.token === 'undefined')
        res.status(401).end(''); // If token does not exist or not sent over, respond with a 401 auth-token not provided
    // ^To update the response message, either with a 401 HTML page or smth

    // Call the next middleware in the chain
    next();
}


module.exports = {
    // The middleware for extracting token into request object's token property
    get_token,

    // The 2 modified versions for token signing and verification with the key in their closures
    create_token,
    verify
}