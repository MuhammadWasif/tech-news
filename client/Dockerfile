FROM node:10.23-alpine as build

WORKDIR /app/client
COPY . /app/client

RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build /app/client/build /usr/share/nginx/html
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
