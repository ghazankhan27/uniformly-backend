FROM node:16.19

COPY . .

RUN npm install

CMD npm run start