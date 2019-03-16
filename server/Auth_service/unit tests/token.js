'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
    Unit test for the tokens module's create/read/sign/verify operations on a given token

    @TODO
	- look into private Keys and stuff like Asymmetric signing and verifying
    - Do a load testing
*/

// Destructure the methods out from the module for testing
const { verify, create_token } = require('../token');
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

// const token = create_token(ctx_for_response.token);

function promise_version() {
    // Using the token module's API with Promises
    create_token(ctx_for_response.token)
        .then(token => {
            print(token);
            print(token.length);
            return token;
        })
        .then(verify)
        .then((token) => {
            print(token);
            print(token.role);
        })
        .catch(print);
}

// Run the promise_version function as it is
// promise_version();

async function asyncawait_version() {
    // Using the token module's API with the Async/Await keywords
    try {
        const token = await create_token(ctx_for_response.token);
        print(token);
        print(token.length);
        const decoded_token = await verify(token);
        print(decoded_token);
        print(decoded_token.role);
    } catch (err) {
        print(err);
    }
}

// Run the asyncawait_version function as it is
// asyncawait_version();

async function test() {
    await promise_version();
    await asyncawait_version();
    return 'finnished';
}
// Call the test function, and when the returned Promise resolves, print out the value resolved
test()
    .then(print);


// Below first call should result in an error due to invalid signature
// verifier(token + 'a')
// verifier(token)
//     .then((token) => {
//         print(token);
//         print(token.role);
//     })
//     .catch(print);