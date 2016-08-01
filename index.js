'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3001;
const app = express();
app.use(bodyParser.json());

const GameStatesAnalyzer = require('./src/GameStatesAnalyzer.js');
const GameState = require('./src/GameState/GameState.js');

var gameStatesAnalyzer = new GameStatesAnalyzer();
var oldState = new GameState();

// TODO
// - The analysis will become confused if the application quits and restarts
// - It seemed to get stuck during realtime testing.
// - Game session stuff (ending a match etc) doesn't work in realtime mode

const returnEmptyResponse = (response) => {
  return response
          .status(200)
          .type('application/json')
          .send(null);
}

app.post('/', (request, response) => {
  if (typeof request.body === "undefined") {
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
  let mode = (process.env.DEBUG_MODE) ? 'debug' : 'normal';
  console.log(`Worker running in ${mode} mode on port ${port}`);

  if (mode === 'debug') {
    gameStatesAnalyzer.debugAnalyze(() => {
      console.log('Analysis complete!');
      process.exit(1);
    });
  }
});
