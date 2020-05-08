FROM node:14-alpine

ENV PORT=3000

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install

COPY ./src /app/src

EXPOSE $PORT


CMD ["npm", "run", "start"]