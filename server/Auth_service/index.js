'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Main server app instance module.
	Exports the created server instance out for the routes in the routes folder to access it.
	This module only holds some misc. routes like ping and error handling routes like for 404.
*/


const express = require('express');
const app = express();
module.exports.app = app;

const { port } = require('./config');
const { print, error, JSON_string } = require('./utils');
const { getPublicKey } = require('./token');

// Finalhandler module to deal with responding back to the client and closing the connection


// Route to get public key for verifying JWTs signed by complimenting private key.
// Might move the key storage to a centralized publicKey store in the future
app.get('/public-key', (req, res, next) => res.end(getPublicKey()));

// Ping Route to check server status
app.get('/ping', (req, res, next) => {
	/*	Things to return to client
		- Current number of users in DB
		- Load of the server
	*/
	res.end(JSON_string({
		status: 200,
		// Current server response latency of the /ping request
		// latency: get_current_latency()
	}));
});

// 404 route handler
app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!")
});

// 500 internal server error route handler
app.use((err, req, res, next) => {
	error(err.stack)
	res.status(500).send('Something broke!')
});

app.listen(port, () => print(`Server listening to port ${port}`));