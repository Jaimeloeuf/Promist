# README for the Promist service

This is a RESTful HTTP based service.
The purpose of this service is to allow user to store and backup their Promist online, and this service allows for real time multi-device syncing of your Promist to give you a seamless experience across all of your devices

In our society where people trust each other less and less, it is important to change this.
To establish a society where trust is valued,
people must fulfil on their promises, in order to keep themselves accountable
Promist gives you the ability to keep track of all your promises in one place and keep yourself accountable of fulfiling them.
Gone are the days where there are things that we want to do on our todo lists everywhere, like literally all my todo lists contain at least one or 2
promises that I want "to do" or fulfil on, which makes it really hard to track and follow up.
Sometimes is not that we do not want to break our promises, but rather sometimes we forget about them and its a honest mistake that people solve
using many hacky solutions such as setting alarm clocks, making reminders on their phone and more..


Users may also have promises made to them from other people.

## Future dev work

- Add a feature that lets user to see their "promise" fulfilment habits, which will be something similiar to iPhone's screen time, where the user can access a dashboard to see things like what percentage of your promises are fulfiled
- Add a ability to share a Promise to either your social media or to your other friends that use Promist, for them to view, which will pressure you to be accountable to what you say and do.

## Database for the Promist Service
A NoSQL Document based Database will be used.
The current choice is MongoDB with Mogoose as the ODM
The structure of the DB will be something like the object below
```js
Promists = {

    // UserID is basically the username or their "email"
    // The value of the "userID" key is basically the Promist for that user.
    userID: {
        promise1: {
            /*  State is one of 3 values to
                0: pending
                1: fulfiled
                2: failed
            */
            state: 0, // The promise is in a pending state
            title: "To do this thing by...",
            description: "I need to get this done and fultil this promise",
            issue_time: 14103481094,

            // The value for the reminders key is a list of timestamp that will trigger a reminder to the user
            // In the example 3 reminders have been set to remind the user of the promise made.
            reminders: [1471398749817, 49287497193473, 13476194791134],

            // Methods the user specified to remind him/her of the reminder
            /*  List of methods:
                0: Email
                1: sms (future-addon feature)
                2: Native-app notifications
            */
            reminder_method: [0, 1],

            // Tags is equivalent to labels
            // Tags is a list/array of tags
            /*  Full list of possible tags:
                - archived
                - deleted (When user deletes promises to the recently deleted list)
                - User-defined
            */
            tags: []
        },
        promise2: {
            
        },
        promise3: {
            
        },
    },
    // Second user with username "John"
    John: {

    },
}
```