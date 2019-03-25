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
    // Limit size of the request body for security reasons
    req.body

});

module.exports = router;