# Solution Architect

## Backend Services / Application layer over data layer
- User/Auth/Token Service:
    - Owns the User Database
    - In charge of authentication/user-login and token provisioning.

- Promist Service:
    - Owns the Promist Database
    - Deals with the promise CRUD operations on the Promise lists.
    - Exposes RESTful HTTP APIs for the CRUD operations
    - Deals with real-time syncing of Promists.
        - Made using either web-sockets or web-hooks
        - Exposes RESTful HTTP APIs for the Synchronization service

- Email Service:
    - Used for email notification and authentication (2FA) actions.

- Admin Service:
    - Used for System administrators to use and control the whole Service eco-system, for things like viewing system health / monitoring for crashes...

- Contract Service:
    - Owns the Contracts Database
    - Deals with the CRUD operations of the Contracts
    - Exposes RESTful HTTP APIs for the CRUD operations
    - Will potentially build a gRPC API for this service

- Search Service:
    - Takes in a search request and performs search operations on all the contracts accessible by the user before returning the results as JSON to the client for rendering.

- Billing Service:
    - Actual billing service is most probably outsourced.
    - Works as a layer on top of the outsorced service, that customizes the billing info of the accounts before requesting the bill to the service.
    - Deals with the response from the billing service, if unsuccessful, lock the user's account.

- Central Logging/Monitoring Service:
    - Owns the Service Log Database
    - Owns the Error Log Database
    - Owns the Event Database
    - Offers dashboard and API for user to see how the microservice service mash is performing.
    - Exposes RESTful HTTP APIs for the CRUD operations
    - Exposes gRPC APIs/stubs for the logging services


## Frontend Services / view engines
- User view service:
    - Service Dependencies:
        - User/Auth/Token Service
    - Service that wraps over the user service to render the user data for the client


All the services can connect and talk to each other with a public/open list of APIs, or using
a common event bus or message queue system

Read more about the services in their respective README files in their directories.

## How to run everything.
- Using the docker-compose.yaml file in this directory, use docker-compose to spin up all the services and establish connections between them.
- Alternatively, all the services have their own dockerfiles in their own directories, to build their images to run seperately.
- If images built and ran independantly, you would need to manually provide the port connections to them via environmental variables.