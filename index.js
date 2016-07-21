const fs = require('fs');
const express = require('express');
const port = 3001;
const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`)

const GameStatesAnalyzer = require('./src/GameStatesAnalyzer.js');
var gameStatesAnalyzer = new GameStatesAnalyzer();

app.listen(port, function () {
  console.log(`Worker running on port ${port}`);
  console.log('------------------------------');

  gameStatesAnalyzer.analyze((data) => {
    console.log('Analysis complete!');
    console.log('------------------------------');
    process.exit(1);
  });
});
