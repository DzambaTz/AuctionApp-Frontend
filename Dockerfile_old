FROM node:14.18-alpine3.14

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
