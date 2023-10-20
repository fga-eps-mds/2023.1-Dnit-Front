FROM node:lts

WORKDIR /app

COPY package.json yarn.lock .env ./ 

RUN yarn --ignore-scripts

COPY ./ ./