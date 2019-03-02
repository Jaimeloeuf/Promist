# Solution Architect

## Services

Total 3 services:
- User/Auth/Token Service: In charge of authentication/user-login and token provisioning.
- Promist Service: Deals with the storage and syncing of Promise-lists of the different users.
- Email Service: Used to email user for notification and authentication (2FA) actions.
- Admin Service: Used for System administrators to use and control the whole Service eco-system, for things like viewing system health / monitoring for crashes...

Read more about the services in their respective README.md files in their directories.

## How to run everything.

Using the docker-compose.yaml file in this directory, use docker-compose to spin up all the services and establish connections between them.
Alternatively, all the services have their own dockerfiles in their own directories, to build their images to run seperately.