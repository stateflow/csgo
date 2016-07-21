'use strict';

module.exports = class MatchState {

  constructor(mapData) {
    this.mapData = mapData;
  }

  hasMapStateData() {
    return typeof(this.mapData) !== "undefined";
  }

  getCurrentMap() {
    return this.mapData.name;
  }

  getCurrentRound() {
    return this.mapData.round;
  }

  getCtScore() {
    return this.mapData.team_ct.score;
  }

  getTScore() {
    return this.mapData.team_t.score;
  }

  isCasual() {
    return this.mapData.mode === "casual";
  }

  isCompetitive() {
    return this.mapData.mode === "competitive"; //TODO untested
  }

  isWarmup() {
    return this.mapData.phase === 'warmup';
  }

  isFreezetime() {
    return this.mapData.phase === 'freezetime'; //TODO untested
  }

  isLive() {
    return this.mapData.phase === 'live';
  }

}
