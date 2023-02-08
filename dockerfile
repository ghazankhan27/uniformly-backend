FROM node:16.19

WORKDIR /app

COPY . /app

RUN npm install

CMD npm run start