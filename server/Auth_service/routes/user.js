'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	API routes for users
*/

// Route to get the user object back from the DB
app.get('/user/:userID', (req, res) => {
    req.params.userID;

    res.end();
});