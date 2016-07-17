'use strict';

const MatchState = require('./MatchState.js');
const PlayerState = require('./PlayerState.js');

module.exports = class GameState {

  constructor(data) {
    this.data = data;

    this.matchState = new MatchState(this.data.map);
    this.playerState = new PlayerState(this.data.player);
  }

  getPlayerName() {
    return this.data.player.name;
  }

  getPlayerSteamId() {
    return this.data.player.steamid;
  }

  isOnMenu() {
    return this.data.player.activity === "menu";
  }

  isInGame() {
    return this.data.player.activity === "playing";
  }

  getMatchState() {
    return this.matchState;
  }

  getPlayerState() {
    return this.playerState;
  }

  getTimestamp() {
    return this.data.provider.timestamp;
  }

  getHumanTimestamp() {
    let date = new Date(
      this.getTimestamp() * 1000
    );

    return date.toUTCString();
  }
}
