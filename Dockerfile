FROM node:18-alpine

# ENV MONGO_DB_USERNAME=admin \
#     MONGO_DB_PWD=admin

WORKDIR /app

COPY package.json .
RUN npm install

COPY . . 

CMD [ "npm","start" ]