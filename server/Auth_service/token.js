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
const jwt = require('jsonwebtoken'); // External dependency from NPM by Auth0
const { promisify } = require('util');

// Using the promisify method from the util module, Promisify the original jwt methods
const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify(jwt.verify);

// Variables used for signing/verifying tokens. Should be read from env or config file.
const expiresAfter = '100s';
const signageKey = 'secret';

/*  Promisified version of jwt.sign method with Signing key and options in its closure.
    Resolves with the signed JWT, else
    Rejects with an error.  */
const create_token = (payload) => jwtSignAsync(payload, signageKey, { expiresIn: expiresAfter });

/*  Promisified version of jwt.verify method with Signing key in its closure.
    If signature is valid and the optional expiration, audience, or issuer are valid if given
    Resolves with the decoded token, else
    Rejects with an error.  */
const verify = (token) => jwtVerifyAsync(token, signageKey);


/*  Token verification middleware:
    To be passed in to the routes before the route handlers.
    If the token is invalid, it will secure the route by automatically ending the req/res cycle
*/
function v_mw(req, res, next) {
    // Middleware to call the verify function first to make sure JWT is valid

    if (!verify(token)) {
        // See what is the status code to respond with depending on
        // why the token is not valid.

        res.end();
    }
    next();
}


/*  Pure function to extract token from request header and returns it
    FORMAT OF TOKEN
    Authorization: Bearer <access_token>

    Split on space and Get token from array and return the token
*/
const extract_token = (req) => req.headers['authorization'].split(' ')[1];

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

    // The 2 promisified methods from the 'jwt' module
    jwtSignAsync,
    jwtVerifyAsync,

    // The 2 modified versions for token signing and verification with the key in their closures
    create_token,
    verify
}


/*	Docs and Notes:

    What should a JWT contain?   (Client holding the JWT will be referred to as the owner)
	- The owner's Identity, basically declaring who the user is
	- What are the resources that the owner can access.
	- Who issused the JWT token to the user
	- And who is the JWT intended for? Meaning who or which microservice should accept the token?
	standard token
	headers:
		{
			"typ": "JWT",
			"alg": "HS256" // The algorithm used for the signature is HMAC SHA-256
		}
		{
			// Who this person is (sub, short for subject)
			// What this person can access with this token (scope)
			// When the token expires (exp)
			// Who issued the token (iss, short for issuer)
			// These below declarations are known as Claims, because the token creator claims a set of assertions that can be used to ‘know’ things about the subject. Because the token is signed with a secret key, you can verify its signature and implicitly trust what is claimed.
			"exp": ,
			"iat": ,
			"expiresIn": ,
			"tokenType": "Bearer",
			"sub":
			"subject": "retrieve data", // What is the purpose of this token/request?
			"usrID": 578ec9,
			"usr": "john@gmail.com",
			"iss": "bouk.com", // Issuer of the token
			"aud": "bouk.com/", // Intended audience that should acccept the token
			"account type": "consumer", // The type of account that the user has
			"roles": {
				// The things/roles that the user is allowed to do
				"role": "consumer"
				"booking": "create"
			}
			"scope": ["read", "write", "update", "del"]
		}
*/