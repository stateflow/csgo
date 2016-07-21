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

  analyze(data) {
    // NOTE - this currently expects filtered requests from the listener
    // For now we are proxying them here instead of putting them into MongoDB
    // console.log(data);
    // process.exit(1);
    let gameState = new GameState(data);
    this.playerGoalManager.trackGoals(gameState, 0, 9999999); //TODO make these params optional
  }

  /**
   * This analyzes a fixed database of game states, rather than accepting real-time data.
   */
  debugAnalyze(callback) {
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
