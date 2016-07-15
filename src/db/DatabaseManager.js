'use strict';

const MongoAdapter = require('./MongoAdapter.js');

const inactivityTimeout = 30000;

module.exports = class DatabaseManager {

  constructor() {
    this.connection = null;
    this.connectionTimeout;
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
      this.startConnectionTimeout();

      callback(newConnection);
    });
  }

  disconnect() {
    this.mongoAdapter.disconnect(this.connection);
    this.connection = null;
  }

  isConnected() {
    return this.connection !== null;
  }

  insertRecord(data, callback) {
    this.resetConnectionTimeout();

    if (this.connection === null) {
      throw new Error('Unable to insert document without a valid connection.');
    }

    return this.mongoAdapter.insertDocument(
      this.connection,
      data,
      () => {
        this.startConnectionTimeout();
        callback()
      }
    );
  }

  startConnectionTimeout() {
    this.connectionTimeout = setTimeout(() => {
      this.disconnect();
    }, inactivityTimeout);
  }

  resetConnectionTimeout() {
    clearTimeout(this.connectionTimeout);
  }
}
