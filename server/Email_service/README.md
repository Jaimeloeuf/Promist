# README for Email service

- Email service is used to handle requests from other services to use email users
- This service is meant only for use by approved services. Services must provide valid auth to use this service.
- Services using Email service can set priority levels for the emails, high priority emails like login tokens will be sent first before the other emails like the monthly updates and stuff
- This microservice does not own a Database in the traditional sense, rather it maintains a queue of emails to be sent both in memory and on-disk using perhaps something similiar to activeMQ/RabbitMQ or Redis even. With different topics and channels for different type of emails and different priority levels

## In case of service failure
- If the app fail, will the emails requests no longer exist? Should there be like a log for persistence like a log that stores the email that has been successfully sent and emails that have failed. Maybe we can utilise kafka, so when a email is successfully sent, a event is published to kafka, which will log that event. Other services can also subscribed to these events to make sure that their email request is completed.