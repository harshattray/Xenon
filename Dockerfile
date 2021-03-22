FROM node:latest

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY ./src .
COPY ./public /app/public

COPY tsconfig.json tsconfig.json
RUN npm run tsc

CMD ["npm", "start"]
