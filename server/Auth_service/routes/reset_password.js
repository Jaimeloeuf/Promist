'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    This routes module will handle all the API endpoint involved in helping the user reset password

    Routes:
    - Endpoint to post userID of the user who wish to reset the password.
        Upon getting a request, to check against DB for user with userID,
        if exists, generate a temperory token and make a email request to mail it to the user,
        else just ignore request
    - Link with token in the URL which the user was sent in the email.
        Upon request, dynamically generate the RESET password page with userID in it and respond back to user
    - Endpoint to post new password for the userID
        Upon request, update the DB with the new password.
        If update successful, redirect user to the login page
        else, store the hash temporarily and keep retrying, and in mean time, email user about failure,
        and inform about potential need to reset password again.
*/

