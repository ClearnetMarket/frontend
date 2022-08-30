FROM node:latest as build-stage

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install  --silent
RUN npm install -g npm@8.18.0
COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm run build


FROM nginx:stable-alpine as production-stage

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build-stage /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]