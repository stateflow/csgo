'use strict';

const DatabaseManager = require('../db/DatabaseManager.js');
const GameStateParser = require('./GameStateParser.js');

module.exports = class GameStatesAnalyzer {

  constructor() {
    this.databaseManager = new DatabaseManager();
  }

  analyze() {
    //TODO
    // Figure out what we can determine
    // Got a kill whislt flashed/smoked/burning
    // Low-hp kills
    // aces, clutches, headshots etc
    // knife kills

    //TODO
    // Need a system for monitoring a players state as they step through a match#
    // You need objects that have state: game, match, player
    // Timeline-like. E.g. how many kills in last state? last round?


    // Connect to db
    this.databaseManager.getConnection(() => {



    });
  }

}
