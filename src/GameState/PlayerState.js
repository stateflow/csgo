'use strict';

const PlayerWeaponsState = require('./PlayerWeaponsState.js');

module.exports = class PlayerState {

  constructor(playerData) {
    this.playerData = playerData;

    this.weaponsState = new PlayerWeaponsState(this.playerData.weapons);
  }

  // Player state

  playerIsAlive() {
    return this.getPlayerHp() > 0; //TODO untested
  }

  getPlayerHp() {
    return this.playerData.state.health;
  }

  getPlayerAp() {
    return this.playerData.state.armor;
  }

  playerHasHelmet() {
    return this.playerData.state.helmet === true;
  }

  playerIsFlashed() {
    return this.playerData.state.flashed !== 0; //TODO untested
  }

  playerIsSmoked() {
    return this.playerData.state.smoked !== 0; //TODO untested
  }

  playerIsBurning() {
    return this.playerData.state.burning !== 0; //TODO untested
  }

  // Player stats

  getPlayerRoundKills() {
    return this.playerData.state.round_kills;
  }

  getPlayerRoundHeadshots() {
    return this.playerData.state.round_killhs;
  }

  getPlayerMoney() {
    return this.playerData.state.money;
  }

  getPlayerMatchKills() {
    return this.playerData.match_stats.kills;
  }

  getPlayerMatchAssists() {
    return this.playerData.match_stats.assists;
  }

  getPlayerMatchDeaths() {
    return this.playerData.match_stats.deaths;
  }

  getPlayerMatchMvps() {
    return this.playerData.match_stats.mvps;
  }

  getPlayerMatchScore() {
    return this.playerData.match_stats.score;
  }

  // Weapons meta

  playerHasPistol() {
    return typeof(this.playerData.weapons.weapon_1) === "undefined"; //TODO untested
  }

  playerHasPrimaryWeapon() {
    return typeof(this.playerData.weapons.weapon_2) === "undefined"; //TODO untested
  }

  getWeaponsState() {
    return this.weaponsState;
  }
}
