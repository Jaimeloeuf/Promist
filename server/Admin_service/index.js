'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Main server app instance module.
	Exports the created server instance out for the routes in the routes folder to access it.
	This module only holds some misc. routes like ping and error handling routes like for 404.
*/


const express = require('express');
const app = express();
const { port } = require('./config');
const { print, error, JSON_string } = require('./utils');

// JWT verifier middleware to be built into the token module
const token_check = require('./token');

/* The token is checked for and verified on every request as all routes
of this service is secured and restricted for admin access only.
If the JWT is invalid, either redirect to Auth service for a refresh, or
end the request cycle as a bad request inside the token_check function.
*/
app.use(token_check);

// Ping Route to check server status
app.get('/ping', (req, res, next) => {
	/*	Things to return to client
		- Load of the server
	*/
	res.end(JSON_string({
		status: 200,
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

app.listen(port, () => print(`Promist: Admin Service started on port ${port}`));