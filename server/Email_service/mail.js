'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    This module maintains the email queue and deals with peristence in case of service failure

    The service user can construct a JS object like the mailOptions obj below and send it to this service over
    HTTP serialization or gRPC, which will then deserialize it back to JS obj to use with the mailer.sendmail
    
    Note that the below method that utilizes nodemailer, relies on a email server to do the work, the code below is just creating a client to connect
    to and use the email server to send emails. Perhaps explore the use of "sendmail" package where no smtp server is required.
*/

const nodemailer = require('nodemailer');
const { mail_config } = require('./config');
const { print, error } = require('./utils');

// A fixed domain name that will be used for the sender options
const email_domain_addr = '@promist.io';

// Create mailer object once at module load time with const reference
const mailer = nodemailer.createTransport(mail_config);

// Function to construct a mail options object for nodemailer to use.
function construct_mail_options(options) {

    // Destructure the options object to extract the variables out to contruct a mailOptions object
    let { sender, recipient, subject, content } = options;

    switch (sender) {
        case 'login': sender = 'authentication'; break;
        case 'security': sender = 'security'; break;
        case 'alert': sender = 'alerts'; break;
        case 'notif': sender = 'Promist_notifications'; break;
        // . Smth like "notif.no.reply@Promist.io"

        default:
            // If function caller passed an actual email address for the 'sender' parameter, use that email address directly.
            if (sender.indexOf('@') > -1)
                break; // Quit the switch case and leave the sender as it is
            // However if function caller passed in an invalid sender address "id", quit function with error
            return Error('Invalid sender added');
    }
    // Add email domain address to back of email address
    sender += email_domain_addr;

    // Construct and return a mailOptions object
    return {
        // 'from' property is the email address of the mailer
        from: sender,

        // Check if the recipient is a list of people, if so, join them with commas.
        to: (recipient instanceof Array) ? recipient.join(', ') : recipient,

        /* Should add what type of to it is, like cc and bcc too */

        // Subject is just what was passed during the function call
        subject,

        // Create the message body with the email template together with the given content
        // html: render_template(content)
        html: content
        /* The email sent should be a HTML doc, should css be embedded in or included using another file? Or minified?
        The html or text that the function caller specified will be placed in the middle of the HTML email template.
        All emails will be using the same template that involves logo, contact-us and more. */
    }
}

// Callback function for when the email has been successfully sent
function success_cb(info) {

    // For now just log to console
    print('Email sent:\n' + info);
    // print('Email sent: ' + info.response);
}
// Callback function for when the email request has failed
function error_cb(err) {

    // For now just log to console
    error(err);

    // Write the error to a central error logging service
}

const sendmail_cb = (err, info) => err ? error_cb(err) : success_cb(info);

/* The service user will call the send function, which wil basically construct the mail options object and place it into the queue
THere will be a loop that constantly checks the queue and send things out.
Instead of constantly checking */

// Send function acts as a wrapper function by composing the sendMail method with the construct_mail_options function
module.exports.send = (options) => mailer.sendMail(construct_mail_options(options), sendmail_cb);