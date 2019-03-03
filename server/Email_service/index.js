'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Server app instance module that handles incoming email sending requests from other services
*/


const express = require('express');
const app = express();
const { print, error, JSON_string } = require('./utils');

// Finalhandler module to deal with responding back to the client and closing the connection


/* Global variables */
const port = 3000; // To be read from env

// Ping Route to check server status
app.get('/ping', (req, res, next) => {
	/*	Things to return to client
		- Number of active connections with socket.io
		- The number of multiplayer game-rooms alive
		- Load of the server?
	*/
	res.end(JSON_string({
		// status: 'Server Up',
		status: 200,
		// Current server response latency of the /ping request
		latency: get_current_latency()
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