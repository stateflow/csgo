'use strict';

module.exports = class PlayerKill {

  constructor(gameState) {
    let playerState = gameState.getPlayerState();

    this.playerHp = playerState.getPlayerHp();
    this.flashed = playerState.playerIsFlashed();
    this.burning = playerState.playerIsBurning();
    this.headshot = false;
  }

  setWasHeadshot(wasHeadshot) {
    this.headshot = wasHeadshot;
  }

  wasOneHp() {
    return this.playerHp === 1;
  }

  wasLowHp() {
    return this.playerHp <= 20;
  }

  wasFlashed() {
    return this.flashed === true;
  }

  wasBurning() {
    return this.burning === true;
  }

  wasHeadshot() {
    return this.headshot === true;
  }
}
