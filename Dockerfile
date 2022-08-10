# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /signin-main
COPY . .
RUN yarn install --production --ignore-engines
CMD ["node", "server.js"]
EXPOSE 3000
