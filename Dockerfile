FROM node:10-alpine
WORKDIR /src
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
CMD ['nodejs', 'index.js']
