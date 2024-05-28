FROM node:14

WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
RUN npm install fluent-logger
RUN npm install cors
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]