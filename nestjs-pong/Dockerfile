FROM node:16-alpine3.11

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

RUN npm i -g @nestjs/cli

EXPOSE 3000 3001

ENTRYPOINT npm install && npm run build && npm run start:dev
