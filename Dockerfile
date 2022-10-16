FROM node:16
WORKDIR /usr/luckysheet
COPY . .
RUN [ "npm", "install", "--legacy-peer-deps" ]
RUN [ "npm", "run", "build" ]
EXPOSE 8000
CMD [ "node", "server.js" ]