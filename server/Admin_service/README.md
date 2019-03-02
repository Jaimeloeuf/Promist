# README for Admin service

## Features to implement

Emergency feature to off all online services. Stopping all sync actions, but allowing native apps to still continue working without sync features.
- If there is a breach or smth like that, the admin can stop online services like logging in and changing passwords.
- The admin can then start the app in a different server and request all users to reset their passwords.
- The 2 actions on the 2 services (Auth and Promist) is grouped together in the admin service, which will make calls to these seperate services