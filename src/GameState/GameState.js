'use strict';

const MatchState = require('./MatchState.js');
const PlayerState = require('./PlayerState.js');

module.exports = class GameState {

  constructor(data) {
    this.data = data;

    this.matchState = (data && data.map) ? new MatchState(data.map) : null;
    this.playerState = (data && data.player) ? new PlayerState(data.player) : null;
  }

  getData() {
    return this.data;
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

  hasMatchState() {
    return this.matchState !== null;
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

  getStateWithoutTimestamp() {
    //console.log(this.data);process.exit(1);
    if (typeof(this.data) === "undefined") {
      return this.data;
    }

    let clone = this.lazyClone(this.data);
    clone.provider.timestamp = 0;

    return clone;
  }

  asStringWithoutTimestamp() {
    return JSON.stringify(this.getStateWithoutTimestamp());
  }

  lazyClone() {
    let asString = JSON.stringify(this.getData());

    return JSON.parse(asString);
  }
}
