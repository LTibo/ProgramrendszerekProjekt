FROM node:20-alpine

WORKDIR /usr/prf

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "server.js" ]