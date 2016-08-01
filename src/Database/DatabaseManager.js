'use strict';

const MongoAdapter = require('./MongoAdapter.js');

module.exports = class DatabaseManager {

  constructor() {
    this.connection = null;
    this.mongoAdapter = new MongoAdapter();
  }

  getConnection(callback) {
    if (this.isConnected()) {
      return callback(this.connection);
    }

    return this.connect(callback);
  }

  connect(callback) {
    this.mongoAdapter.connect((newConnection) => {
      this.connection = newConnection;

      callback(newConnection);
    });
  }

  isConnected() {
    return this.connection !== null;
  }

  getGameStateRecords(callback) {

    if (this.connection === null) {
      throw new Error('Unable to retrieve documents without a valid connection.');
    }

    return this.mongoAdapter.getAllDocuments(
      this.connection,
      {},
      callback
    );
  }

}
