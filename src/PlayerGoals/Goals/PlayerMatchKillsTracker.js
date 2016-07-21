'use strict';

module.exports = class PlayerMatchKillsTracker {

  constructor() {
    this.STATE_DORMANT = 'STATE_DORMANT';
    this.STATE_TRACKING = 'STATE_TRACKING';
    this.state = this.STATE_DORMANT;

    this.playerRegularKillCount = 0;
    this.playerLowHpKillsCount = 0;
    this.playerFlashedKillsCount = 0;
    this.playerBurningKillsCount = 0;
    this.playerOneHpKillsCount = 0;
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
    this.playerRegularKillCount = 0;
    this.playerLowHpKillsCount = 0;
    this.playerFlashedKillsCount = 0;
    this.playerBurningKillsCount = 0;
    this.playerOneHpKillsCount = 0;
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

  addAKill(playerState) {
    if (playerState.getPlayerHp() <= 20) {
      console.log(`User got a kill (low HP, ${playerState.getPlayerHp()})!`);
      this.playerLowHpKillsCount++;
      return;
    }

    if (playerState.getPlayerHp() === 1) {
      console.log(`User got a kill (1 HP)!`);
      this.playerOneHpKillsCount++;
      return;
    }

    if (playerState.playerIsFlashed()) {
      console.log(`User got a kill (flashed)!`);
      this.playerFlashedKillsCount++;
      return;
    }

    if (playerState.playerIsBurning()) {
      console.log(`User got a kill (burning)!`);
      this.playerBurningKillsCount++;
      return;
    }

    console.log('User got a kill!');
    this.playerRegularKillCount++;
  }

  getTotalKills() {
    return (
      this.playerRegularKillCount
      + this.playerLowHpKillsCount
      + this.playerFlashedKillsCount
      + this.playerBurningKillsCount
      + this.playerOneHpKillsCount
    );
  }

  reportResults() {
    let regular = this.playerRegularKillCount;
    let lowHp = this.playerLowHpKillsCount;
    let flashed = this.playerFlashedKillsCount;
    let burning = this.playerBurningKillsCount;
    let oneHp = this.playerOneHpKillsCount;

    return `${this.getTotalKills()} kills in this match (${regular} regular, ${lowHp} low hp, ${flashed} flashed, ${burning} burning, ${oneHp} 1-hp.)`;
  }
}
