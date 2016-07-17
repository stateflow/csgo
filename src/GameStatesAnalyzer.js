'use strict';

const DatabaseManager = require('./db/DatabaseManager.js');

const GameState = require('./GameState/GameState.js');

module.exports = class GameStatesAnalyzer {

  constructor() {
    this.databaseManager = new DatabaseManager();
    this.previousState = null;
  }

  analyze(callback) {

    // TODO Implement these PlayerGoals
    // ---------------------------------
    // Got a kill whilst flashed
    // Got a kill whilst burning
    // Got a kill with low HP
    // Got a kill with 1 HP
    // Got a 3K
    // Got a 4K
    // Got an Ace
    // Made a Clutch
    // Made an Ace-Clutch
    // Got a knife kill (TODO how?)
    // Got 2+ knife kills
    // Got a headshot
    // Got 3 headshots
    // Got 5 headshots
    // Got a HE kill (kobe)
    // Won 16-0 (competitive)
    // Won 8-0 (casual)
    // Got an AK 1-tap headshot
    // Got a USP 1-tap headshot
    // Got a molotov kill

    // These goals require looking accross n states.
    // Proposed solution for this is to set arbitrary goals,
    // that are tracked for success or failure in real time.

    // Goals are started, tracked and resolved by 3 types of state condition:
    // TriggerCondition, TrackingCondition, ResolutionCondition

    // TODO I think we can track the progress of each goal in the app's memory
    // (until resolved), and check each state for it's progress or resolution.
    // Also, we may just need to constantly check for resolution, as checking progress is the same?


    // Connect to db
    this.databaseManager.getConnection((db) => {

      this.databaseManager.getGameStateRecords((records) => {
        let i = 0;

        records.forEach((record) => {
          let newState = new GameState(record);

          if (this.hasPreviousState() === false) {
            this.previousState = newState;
            return;
          }

          this.determineThings(
            this.previousState,
            newState,
            i
          );

          this.previousState = newState;
          i++;
        });

        callback(records);
      });

    });
  }

  hasPreviousState() {
    return this.previousState !== null;
  }

  determineThings(oldState, newState, index) {
    //TODO just testing
    if (oldState.isInGame() && newState.isInGame()) {
      if (newState.getPlayerState().getPlayerMatchKills() > oldState.getPlayerState().getPlayerMatchKills()) {
        console.log(`Player got a kill! @ Game state occurence ${index} (at ${newState.getHumanTimestamp()})`);
      }
    }
  }
}
