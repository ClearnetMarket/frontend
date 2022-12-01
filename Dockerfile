FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g

COPY . /app