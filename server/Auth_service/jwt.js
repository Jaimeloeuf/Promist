'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module is a wrapper over the 'jsonwebtoken' package to create/read/sign/verify a token
	This does not handle and authentication. Just token based Identity verification

    @TODO
    - Add a function to coerce Auth header to either all lower or upper case (No need if using Express)
    - Write unit test for this module
	- look into private Keys and stuff like Asymmetric signing and verifying
	- Create child processes too, to deal with the parsing and signing as it seems like it
      will take quite abit of CPU power
    - Start implementing JWEs

    So at the start of this module, the PublicPrivate key pair will be generated and
    automatically created...
*/

// Dependencies
const jwt = require('jsonwebtoken'); // External dependency from NPM by Auth0
const { promisify } = require('util');

// Using the promisify method from the util module, Promisify the original jwt methods
const create = promisify(jwt.sign);
const verify = promisify(jwt.verify);

// Function to generate the Public-Private key pairs?
function key_setup() {
    // Using the built in crypto modules? Perhaps find a way to generate the values
    // or if not try to find a library that can generate it for me
}

/*  Promisified version of jwt.sign method with Signing key and options in its closure.
    Resolves with the signed JWT, else
    Rejects with an error.  */
// const create_token = (payload) => (signOption) => jwtSignAsync(payload, signageKey, signOption);
// const create_token = (signOption) => (payload) => jwtSignAsync(payload, signageKey, signOption);
const create_token = (signOption) => (payload) => (signageKey) => jwtSignAsync(payload, signageKey, signOption);


/*  Promisified version of jwt.verify method with Signing key in its closure.
    If signature is valid and the optional expiration, audience, or issuer are valid if given
    Resolves with the decoded token, else
    Rejects with an error.  */
// const verify = (token) => (verifyOption) => jwtVerifyAsync(token, signageKey, verifyOption);
const verify = (verifyOption) => (token) => jwtVerifyAsync(token, signageKey, verifyOption);


/*  Pure function to extract token from request header and returns it
    FORMAT OF TOKEN --> Authorization: Bearer <access_token>
    Split on space, get token from array and return it. */
const extract_token = (req) => req.headers['authorization'].split(' ')[1];

module.exports = {
    // Token extraction function
    extract_token,

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

    JWTs are used for stateless Auth and in a stateless request
    meaning that it should contain all and just enough data to make the request valid and enough
    for generating the response back
    Do not put too much claims or data into the JWT. Only what is needed




    header tells you what is the algorithm used for either signing the token or encrypting the token
    header also tells what type of token is it. Is it a JWT or is it a JWE?

    the payload will say what is the token used for. E.g. identity token / information token...
*/