'use strict';

const PlayerKill = require('./PlayerKill.js');

module.exports = class PlayerMatchKillsTracker {

  constructor() {
    this.STATE_DORMANT = 'STATE_DORMANT';
    this.STATE_TRACKING = 'STATE_TRACKING';
    this.state = this.STATE_DORMANT;

    this.playerKills = [];
    this.roundHeadshots = [];
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
    this.playerKills = [];
    this.roundHeadshots = [];
  }

  resetRound() {
    this.roundHeadshots = [];
  }

  conditionsAreSuitable(gameState) {
    if (gameState.userIsPlaying() && gameState.getMatchState().isLive()) {
      return true;
    }

    return false;
  }

  userGotAKill(gameState) {
    return gameState.getPlayerState().getPlayerMatchKills() > this.getTotalKills();
  }

  userGotAHeadshotKill(gameState) {
    return gameState.getPlayerState().getPlayerRoundHeadshots() > this.getRoundHeadshots();
  }

  /**
   * Add a kill, but check if it was of a special type.
   * NOTE - Waterfall-style, "rarest" first & the types cannot stack.
   */
  addAKill(gameState, wasHeadshot = false) {
    let playerState = gameState.getPlayerstate();
    let playerKill = new PlayerKill(gameState);
    playerKill.setWasHeadshot(wasHeadshot);

    this.playerKills.push(playerKill);
  }

  getTotalKills() {
    return this.playerKills.length;
  }

  getRoundHeadshots() {
    return this.roundHeadshots;
  }

  reportResults() {
    return 'PlayerMatchKillsTracker.reportResults TODO';
    // let regular = this.playerRegularKillCount;
    // let lowHp = this.playerLowHpKillsCount;
    // let flashed = this.playerFlashedKillsCount;
    // let burning = this.playerBurningKillsCount;
    // let oneHp = this.playerOneHpKillsCount;
    //
    // return `${this.getTotalKills()} kills in this match (${regular} regular, ${lowHp} low hp, ${flashed} flashed, ${burning} burning, ${oneHp} 1-hp.)`;
  }
}
