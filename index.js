const fs = require('fs');
const express = require('express');
const port = 3001;
const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`)

const GameStatesAnalyzer = require('./src/handlers/GameStatesAnalyzer.js');

var gameStatesAnalyzer = new GameStatesAnalyzer();

app.get('/', function(request, response) {
  return gameStatesAnalyzer.handle(request, response);
});

app.listen(port, function () {
  console.log(`Listener ready on port ${port}`);
});
