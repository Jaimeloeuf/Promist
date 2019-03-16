'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
    Unit test for the tokens module's create/read/sign/verify operations on a given token

    @TODO
	- look into private Keys and stuff like Asymmetric signing and verifying
    - Do a load testing
*/

// Destructure the methods out from the module for testing
const { verify, create_token, verifier } = require('../token');
const assert = require('assert');

const print = console.log;

/* Ctx object that will mimick Ctx objects before being processed by the createToken method.
    Before the user have a JWT, and where they just posted their credentials for getting a JWT */
const ctx_for_response = {
    // Mock user object as payload for testing purposes
    token: {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com',
        role: 'user'
    },
    res_headers: {}
}

// createToken(ctx_for_response)
//     .then(() => print(ctx_for_response))
//     .then(() => print(ctx_for_response.res_headers['Set-Cookie'])) // Use a set_cookie function to pass in the things to be set
//     .catch(print);

const token = create_token(ctx_for_response.token);
print(token);
print(token.length);

/* Ctx object that will mimick Ctx objects that are have a token sent to the server by the client,
where verification is needed and not token generation. */
const ctx_from_request = {
    headers: {
        // authorization: `Bearer ${ctx_for_response.res_headers['Set-Cookie']}`
        authorization: `Bearer ${token}`
    }
}

// verify(ctx_from_request)
//     .then(print)
//     .catch(print);

// Below first call should result in an error due to invalid signature
// verifier(token + 'a')
verifier(token)
    .then((token) => {
        print(token);
        print(token.role);
    })
    .catch(print);