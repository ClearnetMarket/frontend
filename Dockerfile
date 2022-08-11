FROM node:lts-alpine as build-stage

RUN mkdir -p /app

COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

RUN npm install
RUN npm install -g npm@8.16.0

EXPOSE 3000:3000

CMD ["npm", "run", "build"]
