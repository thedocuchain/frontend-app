FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

RUN echo "ENV: ${NODE_ENV}" && yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
