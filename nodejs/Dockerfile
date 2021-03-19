FROM node:15-alpine
MAINTAINER wtakase <wataru.takase@kek.jp>

WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install && npm install -g nodemon
CMD ["nodemon", "src/index.js"]
