'use strict';

module.exports = class MatchState {

  constructor(mapData) {
    this.mapData = mapData;
  }

  getCurrentMap() {
    return this.data.map.name;
  }

  getCurrentRound() {
    return this.data.map.round;
  }

  getCtScore() {
    return this.data.map.team_ct.score;
  }

  getTScore() {
    return this.data.map.team_t.score;
  }

  isCasual() {
    return this.data.map.mode === "casual";
  }

  isCompetitive() {
    return this.data.map.mode === "competitive"; //TODO untested
  }

  isWarmup() {
    return this.data.map.phase === 'warmup';
  }

  isFreezetime() {
    return this.data.map.phase === 'freezetime'; //TODO untested
  }

  isLive() {
    return this.data.map.phase === 'live';
  }

}
