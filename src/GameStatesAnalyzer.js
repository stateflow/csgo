'use strict';

const DatabaseManager = require('./db/DatabaseManager.js');

const GameState = require('./GameState/GameState.js');
const PlayerGoalManager = require('./PlayerGoals/PlayerGoalManager.js');

module.exports = class GameStatesAnalyzer {

  constructor() {
    this.databaseManager = new DatabaseManager();
    this.playerGoalManager = new PlayerGoalManager();
    this.sessionMetaTracker = this.playerGoalManager.getSessionMetaTracker();
  }

  analyze(callback) {

    // Connect to db
    this.databaseManager.getConnection((db) => {


      this.databaseManager.getGameStateRecords((records) => {

          let total = records.length;

          records.forEach(
            (record, index) => {
              let newState = new GameState(record);
              this.playerGoalManager.trackGoals(newState, index, total);
            }
          );

          console.log('--------- Session Ended. ---------');
          console.log(this.sessionMetaTracker.reportResults());
          callback(records);
      });
    });
  }
}
