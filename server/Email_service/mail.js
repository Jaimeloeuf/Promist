'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    This module maintains the email queue and deals with peristence in case of service failure
    Module to create logs of the email queue

    
    So the index.js should be the email service! Where its job is to clear the email queue

    a first in first out queue (FIFO) holds the list of email requests

    On service startup:
    - At service start up, the startup function will read the log from the filesystem into the array and start working on the array

    
    Rmb that the central process of this service is just sending out emails from the queue
    The RESTful API server is just one of the methods to expose this service to the outside world.
    Why am I using RESTful HTTP again? Shouldn't I use RESTful gRPC for this purpose instead?


    There shouldn't be 2 queues for different priority levels, there should just be one queue.
    Prioity levels just determines the position/element of the queue where the email sending request will be inserted into.
    So like high priority means insert at the front. Low priority means insert at the back

    .. This wont work

    There should be 2 queues, as with 2 queues you do not need to maintain the position of the last request of the high prioirty message.
    You just dump it at the back of the high prioirty queue

    There will be timers to time how long the queue hasn't been empty and also time what is the average throughput of the email service as part of diagnostics


    The service user can construct a JS object like the mailOptions obj below and send it to this service over HTTP serialization or gRPC, which will then
    deserialize it back to JS obj to use with the mailer.sendmail
*/

// Note that the below method that utilizes nodemailer, relies on a email server to do the work, the code below is just creating a client to connect
// to and use the email server to send emails. Perhaps explore the use of "sendmail" package where no smtp server is required.
const nodemailer = require('nodemailer');
const { print } = require('./utils');

var mailer = nodemailer.createTransport(mail_config);

const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
};

const email_domain_addr = '@promist.io';

// Function to construct a mail options object for nodemailer to use.
function construct_mail_options(sender, recipient, subject, content, options = { html: false, from: undefined }) {
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
        subject: subject,

        // Create the message body with the email template together with the given content
        html: render_template(content)
        /* The email sent should be a HTML doc, should css be embedded in or included using another file? Or minified?
        The html or text that the function caller specified will be placed in the middle of the HTML email template.
        All emails will be using the same template that involves logo, contact-us and more. */
    }
}


// mailer.sendMail(mailOptions, (error, info) => {
//     if (error)
//         console.log(error);
//     else
//         console.log('Email sent: ' + info.response);
// });

// Below is currying? It works thos but hard to read
const compose = (error) => (info) => error ? error : info;
const sendmail_cb = (error, info) => print(compose(error)(info))
mailer.sendMail(mailOptions, sendmail_cb);