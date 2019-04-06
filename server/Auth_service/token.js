'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
    This module wraps over the jwt module to apply sign and verify options into the methods
    from the jwt module before exporting the functions returned by these partial applications.
    Essentially the sign and verify options specific to this service is defined in here.

    @TODO
    - Finnish writing the verification middleware
	- look into private Keys and stuff like Asymmetric signing and verifying
	- Create child processes too, to deal with the parsing and signing as it seems like it
      will take quite abit of CPU power
    - Start implementing JWEs (Is JWEs needed if there are stored in a HttpOnly cookie?)
*/

// Dependencies
// var { extract_jwt_in_header, create_token, verify_token, getPublicKey } = require('./jwt');
// Changed imported method to import jwt and before calling methods to protect this namespace.
const jwt = require('./jwt');
const print = console.log;

/*  User to specify the sign and verify options directly in this module for every service
    The OPTIONS MUST BE DEFINED, and they must be defined inside this module,
    thus for the jwt module, the signOptions is the first function's parameter */

// Token Signing OPTIONS
var signOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    // audience: 'https://Promist.io',
    audience: ['https://Promist.io', '.... all the services names'],
    expiresIn: '10m', // Give the token a 10min lifetime
    algorithm: 'RS256' // Must be RS256 as using asymmetric signing
};

// Token verification  OPTIONS
var verifyOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    // audience: 'https://Promist.io',
    audience: ['https://Promist.io', '.... all the services names'],
    algorithm: ['RS256'] // Unlike signOption that we used while signing new token , we will use verifyOptions to verify the shared token by client. The only difference is, here the algorithm is Array [“RS256”].
};

/*  For the above sign and verify options, it seems that sometimes, the user do not want to use
    these, and would like to override them with different values for the properties

    Instead of mutating the sign and verify options, create new objects from
    them following the immutability concept from functional paradigm
*/
// Utility function for merging. Returns an object made by merging the 2 input objects
const merge = (obj1) => (obj2) => ({ ...obj1, ...obj2 });

// Convert the options into partially applied functions with the original object in the closure
// Specialized function created by partial application
signOptions = merge(signOptions);
verifyOptions = merge(verifyOptions);

/*  Define the API/or interface first, before writing the implementation!

Current interface is
(key) => (option) => (payload)
where external users get the interface of
(payload)

Can we make it so that the interface is
(payload, ?options)   where options is optional

then the implementation would be a function that runs
if options
    merge options
(options) => (payload) // Apply final options then payload

*/

// In the jsonwebtoken package, the options was entered last as an optional input. Maybe try this?
// The optional options input will be used to override the options object defined in the tokens module
// This ability to change the signOptions should only be available to the services that are signing
// the different tokens, as there would be different needs for the different tokens, however for
// verification, the options should remain the same.

// Version2 for deep merge using lodash's merge module



/*  Payload given to create_token function should only contain private claims and
    should not hold any of the pre-registered interoperable claim names and values. */

// Self invoking anonymous function for applying options into the curried functions
(function () {
    // Return a function with signOption object in its closure and assign function back to create_token
    create_token = create_token(signOptions);
    // Return a function with verifyOption object in its closure and assign function back to verify
    verify_token = verify_token(verifyOptions);
}) // Stop this invocation for now


function create_token2(payload, options = {}) {
    // Always merge with options object, because default value for it is alr an empty object
    // merge with the default signOptions object for overriding properties
    // Merge by finnishing application with the partial application function
    options = signOptions(options);

    // Apply the options first before applying the payload as per the curried function
    // Return the result directly without waiting for it as the awaiting should be done by the function caller.
    return jwt.create_token(options)(payload);
}

/* Always merge with options object, because default value for it is alr an empty object
merge with the default signOptions object for overriding properties
Merge by finnishing application with the partial application function

Apply the options first before applying the payload as per the curried function
Return the result directly without waiting for it as the awaiting should be done by the function caller. */
const create_token = (payload, options = {}) => jwt.create_token(signOptions(options))(payload);


function verify_token(payload, options = {}) {
    
}


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
    req.token = extract_jwt_in_header(req);
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
    verify_token,

    // Export method for getting public key with from the jwt module
    getPublicKey: jwt.getPublicKey
}