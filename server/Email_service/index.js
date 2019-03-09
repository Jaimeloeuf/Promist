'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Server app instance module that handles incoming email sending requests from other services
	
	This service will be upgraded to use KoaJS
	If koa JS used, body-parser package may be needed
*/


const express = require('express');
const app = express();
const send_mail = require('./mail').send;
const { port } = require('./config');
const { print, error, JSON_string } = require('./utils');
// Finalhandler module to deal with responding back to the client and closing the connection


// Route to post email requests to, with optional requests for the email service to respond back when the service is performed
app.post('/send', express.json(), (req, res) => {
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