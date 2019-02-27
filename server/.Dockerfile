# This is the Dockerfile for the Node server app service. Run this file individually for each service
# All the services will be spawned by and tied together by the docker-compose.yaml file

FROM node

EXPOSE 80

# Maintainer for this Dockerfile
MAINTAINER jaimeloeuf@gmail.com

# Create app directory
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app






# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


# Run the commands needed to build the image
RUN apt-get update -yqq
# Install NPM dependencies and build code for production only
RUN npm install --only=production

# Bundle app source
COPY . .

# Define the command to run your app using CMD which defines your runtime.
# Use "npm start" which will run your nodeJS app using the run command you specified in package.json
ENTRYPOINT ["npm", "start"]








# To build and run the image from this Dockerfile
# docker build -t Promist-Server .
# docker run -it --rm --name Promist Promist-Server