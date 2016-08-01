'use strict';

const DatabaseManager = require('./Database/DatabaseManager.js');

const GameState = require('./GameState/GameState.js');
const PlayerGoalManager = require('./PlayerGoals/PlayerGoalManager.js');

module.exports = class GameStatesAnalyzer {

  constructor() {
    this.databaseManager = new DatabaseManager();
    this.playerGoalManager = new PlayerGoalManager();
    this.sessionMetaTracker = this.playerGoalManager.getSessionMetaTracker();
  }

  /**
   * Analyzes game states in realtime.
   *
   * @param  {GameState} gameState
   */
  analyze(gameState) {
    this.playerGoalManager.trackGoals(gameState);
  }

  /**
   * This analyzes a fixed database of game states, rather than accepting real-time data.
   *
   * @param {function} callback
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
