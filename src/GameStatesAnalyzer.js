'use strict';

const DatabaseManager = require('./db/DatabaseManager.js');

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
    // To make determinations, we need a record of recent states,
    // then compare them.


    // Connect to db
    this.databaseManager.getConnection((db) => {

      //TODO iterate captured records, create some GateState objects, see what we got
      this.databaseManager.getGameStateRecords((cursor) => {
        //TODO.. Do this.
      });

    });
  }

}
