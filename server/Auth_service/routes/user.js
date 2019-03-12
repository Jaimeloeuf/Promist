'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	API routes for users
*/

// Route to get the user object back from the DB
app.get('/user/:userID', (req, res) => {
    req.params.userID;

    res.end();
});

// Route to get token from the service
app.post('/tokens', express.json(), (req, res) => {
    /*  @Code-flow
        Use the bodyParser middleware to read the user credentials from the request body
        Get the password hash of user with "userID" from the DataBase
        compare it with the password user posted
        Create a JWT and send it back to the user
    */
});

// Route to get a new JWT with a complimentary refresh token
app.post('/tokens/refresh', express.json(), (req, res) => {
    // Use the bodyParser middleware to read the refresh token in the request body

    // Verify that the refresh token is valid

    // Create a new token and return to the client
});