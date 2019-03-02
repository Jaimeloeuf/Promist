# List of APIs for this app

The APIs will be organized by HTTP request methods
All URLs will have, "/api/" prepended to it.
The "api" in the URLs will have a version attached to it.

## GET

/user/:userID
    Get the general stat of the user with :userID
/user/:userID/promises/all
    Get the full lists of promises for the user with :userID
/user/:userID/promises/:promiseID
    Get the promise with :promiseID for the user with :userID

## POST

/user/:userID/promises/new
    Create a new Promise entry for the user with :userID

## PUT

## DELETE

/user/:userID/promises/:promiseID
    Delete the promise with :promiseID for the user with :userID