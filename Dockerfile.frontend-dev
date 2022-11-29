FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

RUN npm install -g npm@8.19.2

COPY . /app