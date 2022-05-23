
FROM node:17 as build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./


RUN npm install 
COPY . .

EXPOSE 3100:3000
CMD ["npm", "run", "dev"]