'use strict';

const SessionMetaTracker = require('./Goals/SessionMetaTracker.js');
const PlayerMatchKillsTracker = require('./Goals/PlayerMatchKillsTracker.js');

module.exports = class PlayerGoalManager {

  // TODO Implement these PlayerGoals
  // ---------------------------------
  // - [x] Got a kill
  // - [ ] Got a kill whilst flashed
  // - [ ] Got a kill whilst burning
  // - [ ] Got a kill with low HP
  // - [ ] Got a kill with 1 HP
  // - [ ] Got a 3K
  // - [ ] Got a 4K
  // - [ ] Got an Ace
  // - [ ] Made a Clutch
  // - [ ] Made an Ace-Clutch
  // - [ ] Got a knife kill (not sure it's possible))
  // - [ ] Got 2+ knife kills
  // - [ ] Got a headshot
  // - [ ] Got 3 headshots
  // - [ ] Got 5 headshots
  // - [ ] Got a HE kill (kobe)
  // - [ ] Won 16-0 (competitive)
  // - [ ] Won 8-0 (casual)
  // - [ ] Got an AK 1-tap headshot
  // - [ ] Got a USP 1-tap headshot
  // - [ ] Got a molotov kill

  constructor() {
    this.sessionMetaTracker = new SessionMetaTracker();
    this.matchTrackers = new Map();
    this.matchTrackers.set('playerMatchKillsTracker', new PlayerMatchKillsTracker());
  }

  trackGoals(gameState) {
    let matchHasEnded = this.sessionMetaTracker.matchHasEnded(gameState);
    this.sessionMetaTracker.trackSession(gameState);

    if (matchHasEnded) {
      this.resetMatchTrackers();
      console.log('Match ended, reporting...');
      this.matchTrackers.forEach((tracker) => {
        console.log(tracker.reportResults());
      });
      return;
    }

    let playerMatchKillsTracker = this.matchTrackers.get('playerMatchKillsTracker');

    // should we start tracking?
    if (playerMatchKillsTracker.isDormant() && playerMatchKillsTracker.conditionsAreSuitable(gameState)) {
      playerMatchKillsTracker.startTracking();
    }

    // are we tracking?
    if (playerMatchKillsTracker.isTracking()) {
      if (playerMatchKillsTracker.conditionsAreSuitable(gameState)) {
        // record kills
        if (playerMatchKillsTracker.userGotAKill(gameState)) {
          playerMatchKillsTracker.addAKill();
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
