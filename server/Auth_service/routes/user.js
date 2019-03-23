'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    API routes for users
    Routes in this module will provide expose the user CRUD operations via RESTful APIs
    All URL endpoints will have a '/user' prefixed to the routes
    
    @Todo
    - Modify the user route to be JWT protected
    - Create a new /user route without the userID, which basically just
      accepts a req from the client, read its JWT to check for the userID
      and then redirects the client to the route that holds their userID
*/

const express = require('express');
const router = express.Router();

// (READ) Route to get the user object back from the DB
router.get('/:userID', (req, res) => {
    res.json({ userID: req.params.userID });
});

module.exports = router;