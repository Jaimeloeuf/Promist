'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This token module will be used to verify and read a given JWT/JWE a.k.a token based Identity verification

    @TODO
	- look into private Keys and stuff like Asymmetric signing and verifying
	- Create child processes too, to deal with the parsing and signing as it seems like it
	  will take quite abit of CPU power
*/

// Dependencies
const jwt = require('jsonwebtoken'); // External dependency from NPM by Auth0

// Variable used for signing/verifying tokens. Should be read from env or config file.
const signageKey = 'secret';

function middleware (req, res, next) {
    // Extract the token out from the request object
    // Verify the token
    // If token is valid, put the token payload into the res.token property,
    // and call the next function in the chaining.
}

/*  Verify function is used to read and verify the token sent by client
    The callback is called with the decoded payload if the signature is valid and optional
    expiration, audience, or issuer are valid if given. Else, it will be called with the error.
*/
module.exports.verify = (ctx) =>
    new Promise((resolve, reject) => {
        /* Is the reject method still needed? */
        getToken(ctx) // Get token out of headers into ctx.token property

        // Pass in the JWT from the user, the key used to sign the tokens and a callback function
        jwt.verify(ctx.token, signageKey, (err, decoded_token) => {
            if (err) {
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


/*	What should a JWT contain?   (The client holding on to the JWT will be referred to as the owner of the JWT)
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