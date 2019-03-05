'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    This module contains the neccessary setup code to get configuration details up and let mail module access it.
*/

// Read the mail_config JSON file and parse it before assigning to mail_config variable
module.exports.mail_config = require('./mail_config.json');
