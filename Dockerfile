FROM node:lts

WORKDIR /app

COPY package.json .env ./ 

RUN yarn --ignore-scripts

COPY ./ ./