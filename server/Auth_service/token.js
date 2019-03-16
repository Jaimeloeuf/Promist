'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This library module will handle the create/read/sign/verify operations on a given token
	This does not handle and authentication. Just token based Identity verification

    @TODO
    - Change the function to accept tokens directly in the parameter instead of Ctx obj
    - Finnish writing the verification middleware
	- look into private Keys and stuff like Asymmetric signing and verifying
	- Create child processes too, to deal with the parsing and signing as it seems like it
      will take quite abit of CPU power
    - Start implementing JWEs
*/

// Dependencies
const jwt = require('jsonwebtoken'); // External dependency from NPM by Auth0
const { promisify } = require('util');

// Variables used for signing/verifying tokens. Should be read from env or config file.
const expiresAfter = '100s';
const signageKey = 'secret';


/*  Token verification middleware:
    To be passed in to the routes before the route handlers.
    If the token is invalid, it will secure the route by automatically ending the req/res cycle
*/
function v_mw(req, res, next) {

    // Use this middleware to call the verify function first to make sure JWT is valid


    if (!verify(token)) {
        // See what is the status code to respond with depending on
        // why the token is not valid.

        res.end();
    }

    next();
}
/* 
// Create token function should be a pure function, async or not
// An optional parameter setToken that defaults to true, can be used to put token into cookies.
const createToken = (ctx, setToken = true, cookie = true) =>
    new Promise((resolve, reject) => {
        jwt.sign(ctx.token, signageKey, { expiresIn: expiresAfter }, (err, token) => {
            if (err)
                return reject(err); // Reject as it is internal error.

			// 	Dealing with tokens:
			// Write token into a cookie for finalHandler to send back to client
			// How do I erase the previously issused cookie stored on the client?
            if (setToken)
                ctx.res_headers['Set-Cookie'] = token;
            // ctx.token = token;
            return resolve(token);
        });
    });
 */

// Synchronous pure function to sign a payload for the final token
const create_token = (payload) => jwt.sign(payload, signageKey, { expiresIn: expiresAfter });

/*  Verify function is used to read and verify the token sent by client
    The callback is called with the decoded payload if the signature is valid and optional
    expiration, audience, or issuer are valid if given. Else, it will be called with the error.

    The below function is a multi staged function that isnt pure.
    It reads and extract token from the Ctx object, before verifying it.
    The functions should be seperated out and be as clean as possible

    As mentioned in above block, to seperate it all into seperate pure functions and
    chain them together using function composition with a higher level function composer
*/
const verify = (ctx) =>
    new Promise((resolve, reject) => {
        /* Is the reject method still needed? */
        getToken(ctx) // Get token out of headers into ctx.token property

        // Pass in the JWT from the user, the key used to sign the tokens and a callback function
        jwt.verify(ctx.token, signageKey, (err, decoded_token) => {
            if (err) {
                console.log(err);
                ctx.setStatusCode(403); // Forbidden
                ctx.newError('Forbidden, invalid auth');
                // if (err === 'invalid audience') // Only true if you add a audience field in the options object
                // ctx.setStatusCode(40??)
                // Error will not be rejected as it is not a code/server/logic error, but a client side error
                return resolve(false); // Since it is a client error, resolve with a 'false'
            }
            else
                ctx.JWT = decoded_token; // After decrypting the token, put data into 'ctx' object for function caller
            return resolve(true); // Resolve with true to indicate verification success
        });
    });

const verifier1 = promisify(jwt.verify);
// Promisified version of the jwt.verify method with Signing key in the closure
const verifier = (token) => verifier1(token, signageKey);

module.exports = {
    // createToken,
    create_token,
    verify,
    verifier
}


/*  Function to extract token from request header.
    FORMAT OF TOKEN
    Authorization: Bearer <access_token>
*/
function getToken(ctx) {
    ctx.token = ctx.headers['authorization'].split(' ')[1]; // Split at space and Get token from array
    // Check if bearer is undefined
    if (typeof ctx.token === 'undefined') {
        ctx.setStatusCode(401); // If token does not exist or not sent over, respond with a 401 auth-token not provided
        ctx.stop(); // Stop execution if no token given and return faillure to function caller.
    }
}


/*	What should a JWT contain?   (Client holding the JWT will be referred to as the owner)
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