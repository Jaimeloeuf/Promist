# List of APIs for this app

The APIs will be organized by HTTP request methods
All URLs will have, "/api/" prepended to it.
The "api" in the URLs will have a version attached to it.

MvP of the product will be the basic CRUD operations for the Promises

## GET

/user/:userID/promises/all
    Get the full lists of promises for the user with :userID
/user/:userID/promises/:promiseID
    Get the promise with :promiseID for the user with :userID

## POST

/user/:userID/promises/new
    Create a new Promise entry for the user with :userID

## PUT

/user/:userID/promises/:promiseID
    Update the promise with :promiseID for the user with :userID

## DELETE

/user/:userID/promises/:promiseID
    Delete the promise with :promiseID for the user with :userID