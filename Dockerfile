FROM node:latest

ENV VITE_BASE_URL="http://localhost:5000"

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . /app