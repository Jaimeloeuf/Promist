# Reminder Service
This is the reminder service, which will be used for sending email reminders to notify the user either about expiring contracts, or other self set notifications about the contracts.

## Questions
- Should the reminder service be in charge of keeping the list of reminders to send out, or should it be done in the contract service or somewhere else?
    - Because if the reminder services deals with the persistence of data, it will be handling or storing all the data from across all the accounts.
- This service will maintain huge amount of application state and problems with sequencing will also arise due to things like changing the queue in real-time without affecting the system.
- If the new reminder is somehow introduced and inserted at the start of the queues the problem is that the service which rely on background timer threads may be tracking the wrong reminder request which will be wrong after a new reminder request insertion.

## Service design notes
- Build the service around a time based queue with the latest reminder being at the front of the queue
- Build in persistence feature for this service to prevent data lose if the app crashes