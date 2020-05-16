FROM node:14-alpine

ENV PORT=3000

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json /app/

RUN npm install

COPY ./src /app/src
COPY ./ormconfig.json /app/ormconfig.json

EXPOSE $PORT


CMD ["npm", "run", "start"]
