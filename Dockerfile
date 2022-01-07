# build

FROM node:16.13-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# nginx

FROM nginx:1.21.5-alpine

WORKDIR /usr/app

COPY --from=builder /usr/app/build ./build

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
