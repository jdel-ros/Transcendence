FROM node:16-alpine3.11

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

EXPOSE 8006

ENTRYPOINT npm install && npm start
