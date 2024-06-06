FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=staging

RUN yarn install --frozen-lockfile

RUN echo "ENV: ${NODE_ENV}" && yarn build

EXPOSE 3000
