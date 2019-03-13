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
    .then(() => print('\n', ctx_for_response.res_headers['Set-Cookie']))
    .catch(print);

const ctx_from_request = {
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJicmFkIiwiZW1haWwiOiJicmFkQGdtYWlsLmNvbSIsImlhdCI6MTU1MjQ1NzAwOSwiZXhwIjoxNTUyNDU3MTA5fQ.f29eK5KW7BBFoqXPy6qMFkgNiBNEjnJWhJCaQAP-cOs'
    }
}


const assert = require('assert');
assert(true, 'Hi');

// verify(ctx_from_request)
//     .then(print)
//     .catch(print);
