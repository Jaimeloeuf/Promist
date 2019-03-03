'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	API endpoint routes for promises
*/

// Import in the server app

// Import db wrapper
const db = require('mongoose');

app.get('/user/:userID/promises/all', (req, res) => {
	req.params.userID;
});

app.get('/user/:userID/promises/:promiseID', (req, res) => {
	req.params.userID;
	req.params.promiseID;
});

app.post('/user/:userID/promises/new', (req, res) => {
	// Get the request body and put it into the Promist DB
	req.params.userID;
});

// Update the promise with :promiseID for the user with :userID
app.put('/user/:userID/promises/:promiseID', (req, res) => {
	req.params.userID;
	req.params.promiseID;
})

app.delete('/user/:userID/promises/:promiseID', (req, res) => {
	req.params.userID;
	req.params.promiseID;
	// Call Promise DB to delete the promise
});