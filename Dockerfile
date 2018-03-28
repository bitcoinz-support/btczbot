FROM node:8.9.4-alpine

ADD . /bot

WORKDIR /bot

CMD ["node", "index.js"]
