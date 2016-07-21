'use strict';

const DatabaseManager = require('./db/DatabaseManager.js');

const GameState = require('./GameState/GameState.js');
const PlayerGoalManager = require('./PlayerGoals/PlayerGoalManager.js');

module.exports = class GameStatesAnalyzer {

  constructor() {
    this.databaseManager = new DatabaseManager();
    this.playerGoalManager = new PlayerGoalManager();
    this.trackers = this.playerGoalManager.getMatchTrackers();
  }

  analyze(callback) {

    // Connect to db
    this.databaseManager.getConnection((db) => {

      this.databaseManager.getGameStateRecords((records) => {

        records.forEach((record) => {
          let newState = new GameState(record);
          this.playerGoalManager.trackGoals(newState);
        }, () => {

          this.trackers.forEach((tracker) => {
            console.log(tracker.reportResults());
          });
          callback(records);
        });

      });

    });
  }
}
