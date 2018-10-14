FROM node:10-alpine
WORKDIR /src
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
CMD node index.js
