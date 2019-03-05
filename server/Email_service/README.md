# README for Email service

- Using the RESTful HTTP service to service interaction method
1. Receive a email request.
2. Sends out the email per the request
3. If email successfully sent, response to service invocation with 200 OK, else response with either 400 failed or 500 service server failed

- Using a Event Driven service interaction model
    - Something like kafka should be used for this event bus/broker, but not neccessarily something as heavy as kafka

1. Service that wants to send out a email, creates an event and notifies the event bus/broker
2. The email service is a consumer of the email request events, will send out the email per the request and record last position of the request commit log
3. If email successfully sent, an email request successful event is created, which can be consumed by the services which made the requests

    - In the event of a crash, the service will
        - View the last completed email request, and follow on from there. (By following the last position of the commit log)



index.js contains the email service! Where its job is to clear the email queue
server.js contains the server app, which will be started from a call from index.js

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


When other services uses this service to send emails,
do they need a response? Or is it just a send and forget thing?
Can we use the "kache" app as the event/msg bus thing?



- Email service is used to handle requests from other services to use email users
- This service is meant only for use by approved services. Services must provide valid auth to use this service.
- Services using Email service can set priority levels for the emails, high priority emails like login tokens will be sent first before the other emails like the monthly updates and stuff
- This microservice does not own a Database in the traditional sense, rather it maintains a queue of emails to be sent both in memory and on-disk using perhaps something similiar to activeMQ/RabbitMQ or Redis even. With different topics and channels for different type of emails and different priority levels

## In case of service failure
- If the app fail, will the emails requests no longer exist? Should there be like a log for persistence like a log that stores the email that has been successfully sent and emails that have failed. Maybe we can utilise kafka, so when a email is successfully sent, a event is published to kafka, which will log that event. Other services can also subscribed to these events to make sure that their email request is completed.