FROM node
WORKDIR /app/server
COPY . /app/server

RUN npm install
CMD [ "npm", "run", "dev" ]



