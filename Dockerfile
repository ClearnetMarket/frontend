FROM node:lts

ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir /app

COPY package*.json /app

WORKDIR /app

RUN npm -g install


COPY . /app
EXPOSE 5173
CMD ["npm", "run", "dev"]