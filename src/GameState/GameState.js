'use strict';

const MatchState = require('./MatchState.js');
const PlayerState = require('./PlayerState.js');

module.exports = class GameState {

  constructor(data) {
    this.data = data;

    this.matchState = (this.data.map) ? new MatchState(this.data.map) : null;
    this.playerState = (this.data.player) ? new PlayerState(this.data.player) : null;
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

  userIsPlaying() {
    //TODO  what is "textinput" exactly? console open? typing in chat? both?
    return (
      this.data.provider.steamid === this.data.player.steamid
      && (
        this.data.player.activity === "playing"
        || this.data.player.activity === "textinput"
      )
    );
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
