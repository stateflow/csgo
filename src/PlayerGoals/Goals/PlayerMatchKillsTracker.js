'use strict';

module.exports = class PlayerMatchKillsTracker {

  constructor() {
    this.STATE_DORMANT = 'STATE_DORMANT';
    this.STATE_TRACKING = 'STATE_TRACKING';

    this.state = this.STATE_DORMANT;
    this.playerKillCount = 0;
  }

  startTracking() {
    this.state = this.STATE_TRACKING;
  }

  stopTracking() {
    this.state = this.STATE_DORMANT;
  }

  isTracking() {
    return this.state === this.STATE_TRACKING;
  }

  isDormant() {
    return this.state === this.STATE_DORMANT;
  }

  reset() {
    this.stopTracking();
    this.playerKillCount = 0;
  }

  conditionsAreSuitable(gameState) {
    if (gameState.userIsPlaying() && gameState.getMatchState().isLive()) {
      return true;
    }

    return false;
  }

  userGotAKill(gameState) {
    return gameState.getPlayerState().getPlayerMatchKills() > this.playerKillCount;
  }

  addAKill() {
    console.log('User got a kill!');
    this.playerKillCount++;
  }

  reportResults() {
    return `${this.playerKillCount} kills in this match.`;
  }
}
