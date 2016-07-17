'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoHost = 'mongodb://localhost:27017/csgo-listener';
const mongoCollection = 'gamestates';

module.exports = class MongoAdapter {

  connect(callback) {
    MongoClient.connect(
      mongoHost,
      function(err, newConnection) {
        if (err) {
          console.log(err);
          throw new Error('Unable to connect to mongodb server.');
        }

        console.log('Mongo connection opened.');
        callback(newConnection);
      }
    );
  }

  disconnect(activeConnection) {
    console.log('Mongo connection closed (due to 20 seconds of inactivity).');
    activeConnection.close();
  }

  getAllDocuments(activeConnection, data, callback) {
    activeConnection
      .collection(mongoCollection)
      .find(
        data,
        (err, result) => {
          if (err) {
            console.log(err);
            throw new Error(`Unable to find documents in mongodb collection "${mongoCollection}".`);
          }

          callback(result);
        }
      );
  }
}
