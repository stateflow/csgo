'use strict';

const SessionMetaTracker = require('./Goals/SessionMetaTracker.js');
const PlayerMatchKillsTracker = require('./Goals/PlayerMatchKillsTracker.js');

module.exports = class PlayerGoalManager {

  // TODO Implement these PlayerGoals
  // ---------------------------------
  // Single Kills
  // - [x] Got a kill
  // - [x] Got a kill whilst flashed
  // - [x] Got a kill whilst burning
  // - [x] Got a kill with low HP
  // - [x] Got a kill with 1 HP
  // - [ ] Got a headshot
  //
  // Multiple Kills (1 round)
  // - [ ] Got a 3K
  // - [ ] Got a 4K
  // - [ ] Got an Ace
  // - [ ] Made a Clutch
  // - [ ] Made an Ace-Clutch
  // - [ ] Got 3 headshots
  // - [ ] Got 5 headshots
  //
  //  Match Result
  // - [ ] Won 16-0 (competitive)
  // - [ ] Won 8-0 (casual)

  // TODO unsure these are possible
  // - [ ] Got an AK 1-tap headshot
  // - [ ] Got a USP 1-tap headshot
  // - [ ] Got a molotov kill
  // - [ ] Got a HE kill (kobe)
  // - [ ] Got a knife kill (not sure it's possible)
  // - [ ] Got 2+ knife kills

  constructor() {
    this.sessionMetaTracker = new SessionMetaTracker();
    this.matchTrackers = new Map();
    this.matchTrackers.set('playerMatchKillsTracker', new PlayerMatchKillsTracker());
  }

  trackGoals(gameState, index = 0, total = 0) {
    let matchHasEnded = this.sessionMetaTracker.matchHasEnded(gameState);
    this.sessionMetaTracker.trackSession(gameState);

    // NOTE only useful for static mongodb db stream
    // Can probably remove it when we adapt to realtime stream
    let quitWhilstPlaying = (index+1 === total && this.sessionMetaTracker.gameActivityIsPlaying());

    if (matchHasEnded || quitWhilstPlaying) {

      console.log('Match ended, reporting...');
      this.matchTrackers.forEach((tracker) => {
        console.log(tracker.reportResults());
      });
      console.log(''); // new line
      this.resetMatchTrackers();
      return;
    }

    let playerMatchKillsTracker = this.matchTrackers.get('playerMatchKillsTracker');

    // should we start tracking kills?
    if (playerMatchKillsTracker.isDormant() && playerMatchKillsTracker.conditionsAreSuitable(gameState)) {
      playerMatchKillsTracker.startTracking();
    }

    // should we check for new kills?
    if (playerMatchKillsTracker.isTracking()) {
      // yep! are new kills still possible?
      if (playerMatchKillsTracker.conditionsAreSuitable(gameState)) {
        // record kills
        if (playerMatchKillsTracker.userGotAKill(gameState)) {
          let wasHeadshot = playerMatchKillsTracker.userGotAHeadshotKill(gameState);
          playerMatchKillsTracker.addAKill(gameState, wasHeadshot);
        }
      } else {
        // e.g. player is in "gameover" or spectating
        playerMatchKillsTracker.stopTracking();
      }
    }
  }

  resetMatchTrackers() {
    this.matchTrackers.forEach((tracker) => {
      tracker.reset();
    });
  }

  getSessionMetaTracker() {
    return this.sessionMetaTracker;
  }
}
