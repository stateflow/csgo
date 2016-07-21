'use strict';

module.exports = class GameMetaTracker {

  constructor() {
    this.MODE_PLAYING = 'MODE_PLAYING';
    this.MODE_MENU = 'MODE_MENU';

    this.previousState = null;
    this.gameMode = null;

    this.currentMap = null;
    this.currentRound = null;

    this.sessionMapsPlayed = [];
    this.sessionActivities = [];
  }

  gameActivityIsPlaying() {
    return this.gameMode === this.MODE_PLAYING;
  }

  shouldResetTrackers(newState) {
    if (this.previousState === null) {
      return false;
    }

    let previousActivity = this.getGameModeFromActivity(
      this.previousState.data.player.activity
    );
    let newActivity = this.getGameModeFromActivity(
      newState.data.player.activity
    );

    if (newActivity !== previousActivity) {
      console.log(`Activity changed (${previousActivity} => ${newActivity}).`);
      return true;
    }

    if (this.gameActivityIsPlaying()) {
      if (this.currentMap !== newState.data.map.name) {
        console.log('Map changed.');
        return true;
      }

      if (newState.data.map.round === 0 && this.currentRound > 0) {
        console.log('New match (round 0).');
        return true;
      }
    }

    return false;
  }

  updateGameModeInfo(gameState) {
    this.gameMode = this.getGameModeFromActivity(gameState.data.player.activity);

    if (this.gameActivityIsPlaying()) {
      this.currentMap = gameState.data.map.name;
      this.currentRound = gameState.data.map.round;
    }

    this.updateSessionProgress(gameState);

    this.previousState = JSON.parse(JSON.stringify(gameState));
  }

  updateSessionProgress(newState) {
    if (this.previousState === null) {
      return;
    }

    let previousActivity = this.getGameModeFromActivity(
      this.previousState.data.player.activity
    );
    let newActivity = this.getGameModeFromActivity(
      newState.data.player.activity
    );

    if (newActivity !== previousActivity || this.sessionActivities.length === 0) {
      this.sessionActivities.push(newActivity);
    }

    if (this.gameActivityIsPlaying()) {
      if (this.currentMap !== newState.data.map.name || this.sessionMapsPlayed.length === 0) {
        this.sessionMapsPlayed.push(newState.data.map.name);
      }
    }
  }

  getGameModeFromActivity(activity) {
    if (activity === 'playing' || activity === 'textinput') {
      return this.MODE_PLAYING;
    }

    return this.MODE_MENU;
  }

  reportResults() {
    return `Session activities: [${this.sessionActivities.toString()}], Maps played: [${this.sessionMapsPlayed.toString()}]`;
  }
}
