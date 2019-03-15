'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    API routes for dealing with tokens
    
    1.  User posts credential to server on the '/login' route
    2.  Login route's handler will authenticate user's credential against those in the Database
    3.  If the credentials are valid,
            - Generate a JWT/Refresh-token pair
            - Put the tokens into the response headers
            - Put the redirect location towards the user homepage into the response headers
            - Respond back to the client with the Response messages


    'tokens' and 'login' routes are both used for exchanging Credentials for JWTs
    When user is on the login page, the creds. should be posted to the /login route
    When user is not on the login page but wants to post creds. for JWTs, then the /token route should be used instead
*/

// Middleware function for authenticating Credentials against those stored in the Database
function authenticate (req, res, next) {

}

// Middleware function for creating JWT payload for the client, creating and signing the JWT and finally attaching it for the user to use
function attach_token (req, res, next) {

}

/*  Routes to get token from the service
    2 Additional middlewares, one for authenticating the Creds, and one for creating and attaching token
    
    @Code-flow
    Use the bodyParser middleware to read the user credentials from the request body
    Maybe Clean/Sanitize the credentials before using it against the DB?
    Get the password hash of user with "userID" from the DataBase
    compare it with the password user posted
    Create a JWT and send it back to the user
*/
app.post('/login', express.json(), authenticate, attach_token);
app.post('/tokens', express.json(), authenticate, attach_token);
// See if the below format is possible
app.post('/tokens or login', express.json(), authenticate, attach_token);


// Route to get a new JWT with a complimentary refresh token
app.post('/tokens/refresh', express.json(), (req, res) => {
    // Use the bodyParser middleware to read the refresh token in the request body

    // Verify that the refresh token is valid

    // Create a new token and return to the client
});