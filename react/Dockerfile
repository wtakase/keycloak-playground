FROM node:15-alpine
MAINTAINER wtakase <wataru.takase@kek.jp>

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
CMD ["yarn", "start"]
