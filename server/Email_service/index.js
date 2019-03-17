'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Server app instance module that handles incoming email sending requests from other services
    
    @Todo
	Update service to use KoaJS, note that body-parser package need be independently installed
*/


const express = require('express');
const app = express();
const send_mail = require('./mail').send;
const { port } = require('./config');
const { print, error, JSON_string } = require('./utils');
// Finalhandler module to deal with responding back to the client and closing the connection


/*  @Doc
    verify if the client with the JWT should be allowed to continue with the route
    Only client with JWTs that specify service roles can access the route handler.


    Public private key
    The services themselves hold the key and methods for verifying JWTs but not signing JWTs
    Only the Auth Service or Token Service can sign JWTs.
    How to use JWTs to verify identiy of the services?
    If using symmetric key signing then it is easy as the keys are the same
    But with Asymmetric, then the problem arises
*/
function service_identity_checker(req, res, next) {
    // This middleware uses the Promise API
    verify(req.token)
        .then((token) => {
            // If token is valid, Check if the role is a service
            if (token.role === 'service')
                next(); // Call next middleware to execute
            else
                throw new Error('ERR: Forbidden route');
        })
        .catch((err) => {
            // Log the error to the error log for analytics

            // End this req/res cycle
        });
}

async function service_identity_checker(req, res, next) {
    // This middleware uses the async/await API
    try {
        const token = await verify(req.token);
        if (token.role === 'service')
            next(); // Call next middleware to execute

        // Or maybe the below check also can depend on how the JWT is structured
        // Check if the service field is true
        if (req.token.service)
            next();
    } catch (err) {
        // Log the error to the error log for analytics

        // End this req/res cycle
    }
}

/*  @Flow
    - Extract token out from request header and attach directly to request object's token property
    - Verify that the JWT signature is valid
    - Check the identity of the client as stated in the JWT to make sure client is an approved service
    - Accept and read the HTTP message body posted from the client
    - Send the mail as specified by the request body (Only this is done in the anoynymous function)

    @Todos
    - How to verify services with tokens? Who will sign the token? Will it be a central authority solution or a decentralized version
    - If token is expired, should I redirect user to go and signin again or refresh token automatically
    - Add a POST body size limit to the bodyParser
    - Take in an optional request on the url for email service to respond back when the service is performed
*/
app.post('/send', get_token, service_identity_checker, express.json(), (req, res) => {
    // Request body is the JSON string parsed by express.json() for send_mail function
    // The bodyParser middleware will only be used for the '/send' route
    send_mail(req.body);
    // End the HTTP req/res cycle after call to send_mail function
    res.end();
});


// Ping Route to check server status
app.get('/ping', (req, res, next) => {
	/*	Things to return to client
		- Number of email requests queued
		- Number of email processed and other usage stats
		- Server/Container Load
	*/
    res.end(JSON_string({
        // status: 'Server Up',
        status: 200,
        // Current server response latency of the /ping request
        // latency: get_current_latency() // Probs easier to calculate this if koa js is used
    }));
});

// 404 route handler
app.use((req, res, next) => {
    res.status(404).send("ERR 404: Cannot find requested resource");
});

// 500 internal server error route handler
app.use((err, req, res, next) => {
    // Log trace stack and error to the console
    error(err.stack);
    res.status(500).send('ERR 500: Internal server error');
});

app.listen(port, () => print(`Server listening to port ${port}`));