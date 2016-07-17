const fs = require('fs');
const express = require('express');
const port = 3001;
const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`)

const GameStatesHandler = require('./src/handlers/GameStatesHandler.js');

var gameStatesHandler = new GameStatesHandler();

app.get('/', function(request, response) {
  return gameStatesHandler.handle(request, response);
});

app.listen(port, function () {
  console.log(`Listener ready on port ${port}`);
});
