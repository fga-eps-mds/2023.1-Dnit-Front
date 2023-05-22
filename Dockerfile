FROM node:lts

WORKDIR /app

COPY package.json yarn.lock ./ 

RUN yarn

COPY ./ ./