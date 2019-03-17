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
// Shorthand utility binding
const print = console.log;


/*  Req object mimicking req objects before being processed by the create_token method.
    Before user have a JWT, and they just posted their credentials for a JWT */
const req = {
    // Mock user object as payload for testing purposes
    token: {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com',
        role: 'user'
    },
    res_headers: {}
}


function promise_version() {
    // Using the token module's API with Promises
    create_token(req.token)
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

    // Below's usage scenario is creating token and putting it in the header for client to use as a Cookie
    // createToken(req)
    //     .then(() => print(req))
    //     .then(() => print(req.res_headers['Set-Cookie'])) // Use a set_cookie function to pass in the things to be set
    //     .catch(print);
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
    // Resolve with the 'finnished' word upon the above 2 promises resolving
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