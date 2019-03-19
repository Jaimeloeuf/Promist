'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    API routes for users
    Routes in this module will provide expose the user CRUD operations via RESTful APIs
    
    @Todo
    - Modify the user route to be JWT protected
    - Create a new /user route without the userID, which basically just
      accepts a req from the client, read its JWT to check for the userID
      and then redirects the client to the route that holds their userID
*/

// (READ) Route to get the user object back from the DB
app.get('/user/:userID', (req, res) => {
    req.params.userID;

    res.end();
});