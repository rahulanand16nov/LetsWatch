# LetsWatch
A barebones Node.js app created using [Express 4](http://expressjs.com/) & [Socket.io](http://socket.io/) to watch YouTube videos simultaneously.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:rahulanand16nov/LetsWatch.git # or clone your own fork
$ cd LetsWatch 
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Things To-Do
* Password protected rooms to facilitate private sessions.
* Adding a chat window.
* Improving UI.
