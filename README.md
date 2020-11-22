<br />
<p align="center">
  <img src="client/public/logo192.png" alt="Logo" width="80" height="80">

  <h3 align="center">Tech News</h3>

  <p align="center">
    Full Stack GraphQL (Apollo) web app with MongoDB and ReactJS
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">Open App</a>
  </p>
</p>

## About The Project

![Product Name Screen Shot][product-screenshot](https://example.com)

This project is a Full Stack Application built with GraphQL with Apollo Server and Apollo Client. It uses MongoDB as database while hosting database on _MongoDB Atlas_. It uses React as UI Library. Application is containerized with Docker and these containers are deployed to _Heroku_

👉🏽 [GraphQL API](https://tech-news-api.herokuapp.com/)

## Local Installation

You can install this project locally by Docker Compose or by starting server and client separately.  
First of all, clone the repo

```sh
git clone https://github.com/MuhammadWasif/tech-news.git
```

or with GitHub CLI

```sh
gh repo clone MuhammadWasif/tech-news
```

### Docker Compose

> Docker and Docker Compose must be installed on your computer

Go to root of project and execute

```sh
docker-compose up
```

It will take time for the first time but when containers are ready you can start development.

You can access servers at  
**React Client**: https://localhost:3000/  
**GraphQL Server**: https://localhost:5000/

(You can change environment variables in `docker-compose.yml` file)

### Individual Setup

If you do not want to use docker-compose, follow these steps:

#### Running the Server

1: Go to `/server` and replace `.env.example` with `.env`.  
2: Make sure to change `MONGO_URI` variable to your database srv string.  
3: Run `npm install` to install the packages.  
4: Run `npm run dev` and GraphQL server will start on http://localhost:5000/

(Make sure that MongoDB is running and your database is accessible through SRV String)

#### Running the Client

1: Goto `/client` directory.  
2: Run `npm install` to install packages.  
3: Run `npm start` and React server will on http://localhost:3000/

If you have any kind of problem, my Discord username is **muhammadwasif#0612**
