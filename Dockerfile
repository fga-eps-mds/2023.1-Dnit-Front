FROM node:lts

WORKDIR /app

COPY package.json ./ 

RUN yarn

COPY ./ ./