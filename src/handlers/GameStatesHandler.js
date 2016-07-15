'use strict';

const GameStatesAnalyzer = require('./../GameStatesAnalyzer.js');

module.exports = class GameStatesHandler {

  constructor() {
    this.gameStatesAnalyzer = new GameStatesAnalyzer();
  }

  handle(request, response) {
    this.gameStatesAnalyzer.analyze();
  }

}
