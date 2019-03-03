'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    This module maintains the email queue and deals with peristence in case of service failure
    Module to create logs of the email queue
*/

// The queue that is being maintained is a first in first out queue (FIFO)

// At service start up, the startup function will read the log from the filesystem into the array and start working on the array

// Rmb that the central process of this service is just sending out emails from the queue
// The RESTful API server is just one of the methods to expose this service to the outside world.
// Why am I using RESTful HTTP again?
// Shouldn't I use RESTful gRPC for this purpose instead?

// So the index.js should be the email service! Where its job is to clear the email queue

/* There shouldn't be 2 queues for different priority levels, there should just be one queue.
    Prioity levels just determines the position/element of the queue where the email sending request will be inserted into.
    So like high priority means insert at the front. Low priority means insert at the back

    .. This wont work

    There should be 2 queues, as with 2 queues you do not need to maintain the position of the last request of the high prioirty message.
    You just dump it at the back of the high prioirty queue

    There will be timers to time how long the queue hasn't been empty and also time what is the average throughput of the email service as part of diagnostics


    The service user can construct a JS object like the mailOptions obj below and send it to this service over HTTP serialization or gRPC, which will then
    deserialize it back to JS obj to use with the transporter.sendmail
*/


// Note that the below method that utilizes nodemailer, relies on a email server to do the work, the code below is just creating a client to connect
// to and use the email server to send emails. Perhaps explore the use of "sendmail" package where no smtp server is required.
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // These auth should be read from the environmental variables and not statically typed in.
        user: '',
        pass: ''
    }
});

const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

// Below mailOptions is to email out to more than one address, and email them HTML instead of text
const mailOptions2 = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
}

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error)
//         console.log(error);
//     else
//         console.log('Email sent: ' + info.response);
// });

// Below is currying? It works thos but hard to read
const compose = (error) => (info) => error ? error : info;
transporter.sendMail(mailOptions, (error, info) => console.log(compose(error)(info)));