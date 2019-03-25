'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    API routes for registering a new user
    All URL endpoints will have a '/user' prefixed to the routes

    @Todo
*/

const express = require('express');
const router = express.Router();
const db = require('../db/db');

// POST route that takes user details and insert to DB
router.post('/register', express.json({ limit: "1kb" }), (req, res) => {
    /* Limit size of the request body for security reasons */

    // Call the DB function and pass it the user details object in the request body
    db.new_user(req.body.user)
        .then(() => {
            // On successful user insertion, send confirmation to user email
            // Redirect user to login page too.
        })
        .catch((err) => {
            // If there is an error, send error back to client and end the req cycle
            res.status(500).send(err);
            // ^ Perhaps just log the error and dont send it back to client for security concerns.
        });
});



module.exports = router;