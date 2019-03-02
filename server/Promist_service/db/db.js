'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	The DB used for Promists will be a NoSQL DB
*/

const { print, error } = require('../utils');

// Returns the Promises that belongs to the user with userID's Promist
const get_promise = (userID) => query_db(`select promist from promistDB with ${userID}`);



db.collection("promist")
	.insertOne({
		title: "user input for title here",
		toc: "timestamp here" // Time of creation

	}, (err, res) => {
		
		if (err)
			throw err;
		
		db.close();
	});