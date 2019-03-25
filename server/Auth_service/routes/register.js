'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    API routes for registering a new user
    All URL endpoints will have a '/user' prefixed to the routes


    @Flow (Of registering a new user)
    - User goes to the register page.
    - User enters email and click enter, and the details are POSTed to the server via AJAX
    - Server creates a one time, short lived JWT with permissions to register only and
      send this JWT to the user's email address as a clickable registration link.
    - User opens email and clicks on the link
    - User is sent to the registration page to fill in all user details.
    - After filling in the details, user clicks enter.
    - User details are POSTed to server via AJAX
    - If user is successfully created on the server, server responds with a redirect
      back to the login page.
      Else if creation failed, respond with a failure and ask user to try again later.

    ^ Endpoints needed:
    - POST: email posting endpoint
    - GET: endpoint where the user goes to with the JWT in the URL directly to fill in details
        - Server responds with the web-app and JWT in the cookie.
    - POST: Final endpoint for user to post all user details before being redirected to login page

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

router

module.exports = router;