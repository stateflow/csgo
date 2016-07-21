'use strict';

module.exports = class SessionMetaTracker {

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

  trackSession(gameState) {
    this.gameMode = this.getGameModeFromActivity(gameState.data.player.activity);

    this.updateSessionProgress(this.previousState, gameState);

    if (this.gameActivityIsPlaying()) {
      if (this.currentMap !== gameState.data.map.name) {
        console.log(`User started playing on ${gameState.data.map.name}`);
      }
      this.currentMap = gameState.data.map.name;
      this.currentRound = gameState.data.map.round;
    }

    this.previousState = JSON.parse(JSON.stringify(gameState));
  }

  // TODO - double reported per map
  matchHasEnded(newState) {
    if (this.previousState === null) {
      return false;
    }

    let previousActivity = this.getGameModeFromActivity(
      this.previousState.data.player.activity
    );
    let newActivity = this.getGameModeFromActivity(
      newState.data.player.activity
    );

    // NOTE - User can be in a match, but hit esc and go to menus.
    // In this scenario, map state data will still be included, so we check for that.
    if (newActivity !== this.MODE_PLAYING && newState.getMatchState().hasMapStateData() === false) {
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

  updateSessionProgress(previousState, newState) {
    if (previousState === null) {
      return;
    }

    let previousActivity = this.getGameModeFromActivity(
      previousState.data.player.activity
    );
    let newActivity = this.getGameModeFromActivity(
      newState.data.player.activity
    );

    if (newActivity !== previousActivity || this.sessionActivities.length === 0) {
      this.sessionActivities.push(newActivity);
    }

    if (this.gameActivityIsPlaying()) {
      if ((this.currentMap !== newState.data.map.name) || this.sessionMapsPlayed.length === 0) {
        this.sessionMapsPlayed.push(newState.data.map.name);
      }
    }
  }

  getGameModeFromActivity(activity) {
    if (activity === 'playing' || activity === 'textinput') {
      return this.MODE_PLAYING;
    }

    if (activity === 'menu') {
      return this.MODE_MENU;
    }

    throw new Error(`Unrecognised activity "${activity}"`);
  }

  reportResults() {
    return `Session activities: [${this.sessionActivities.toString()}], Maps played: [${this.sessionMapsPlayed.toString()}]`;
  }

  reset() {
    // Do nothing
  }
}
