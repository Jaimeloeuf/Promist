'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
    Unit test for the tokens module's create/read/sign/verify operations on a given token

    @TODO
	- look into private Keys and stuff like Asymmetric signing and verifying
    - Do a load testing
*/

// Destructure the methods out from the module for testing
const { verify, createToken } = require('../token');

const print = console.log;

/* Ctx object that will mimick Ctx objects before being processed by the createToken method.
    Before the user have a JWT, and where they just posted their credentials for getting a JWT */
const ctx_for_response = {
    // Mock user object as payload for testing purposes
    token: {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    },
    res_headers: {}
}

createToken(ctx_for_response)
    .then(() => print(ctx_for_response))
    .then(() => print(ctx_for_response.res_headers['Set-Cookie']))
    .catch(print);


// Create a time delay to wait for createToken function and its Promise chain have all completed
setTimeout(() => {
    /* Ctx object that will mimick Ctx objects that are have a token sent to the server by the client,
    where verification is needed and not token generation. */
    const ctx_from_request = {
        headers: {
            authorization: `Bearer ${ctx_for_response.res_headers['Set-Cookie']}`
        }
    }

    verify(ctx_from_request)
        .then(print)
        .catch(print);
}, 500);

// const assert = require('assert');