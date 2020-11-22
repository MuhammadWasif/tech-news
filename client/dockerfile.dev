FROM node:10.23-alpine


WORKDIR /app/client
COPY . /app/client

RUN npm install
CMD [ "npm", "start" ]
EXPOSE 3000
