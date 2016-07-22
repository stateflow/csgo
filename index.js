'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;
const app = express();
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`)

const GameStatesAnalyzer = require('./src/GameStatesAnalyzer.js');
const GameState = require('./src/GameState/GameState.js');

var gameStatesAnalyzer = new GameStatesAnalyzer();
var oldState = new GameState();

// TODO
// The analysis will become confused if the application quits and restarts
// Also, it seemed to get stuck during realtime testing.
// Also, the kills monitoring has waterfall flaw: low hp overwrites flashbang
// Game session stuff (ending a match etc) doesn't work in realtime mode

const returnEmptyResponse = (response) => {
  return response
          .status(200)
          .type('application/json')
          .send(null);
}

app.post('/', (request, response) => {
  if (typeof request.body === "undefined") {
    console.log('Cannot parse request - no body');
    return;
  }

  let gameState = new GameState(request.body);

  if (gameState.asStringWithoutTimestamp() === oldState.asStringWithoutTimestamp()) {
    return returnEmptyResponse(response);
  }

  gameStatesAnalyzer.analyze(gameState);
  oldState = new GameState(gameState.getData());

  return returnEmptyResponse(response);
});

app.listen(port, () => {
  console.log(process.env.DEBUG_MODE);
  console.log(`Worker running on port ${port}`);
  console.log('------------------------------');

  if (process.env.DEBUG_MODE) {
    gameStatesAnalyzer.debugAnalyze(() => {
      console.log('Analysis complete!');
      console.log('------------------------------');
      process.exit(1);
    });
  }
});
