FROM node:20-alpine

WORKDIR /usr/prf

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "npx", "ng", "serve", "--host", "0.0.0.0" ]