const CardDatabase = require('./cards/CardDatabase.js');
const BasicSearch = require('./searchEngines/BasicSearch.js');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

const db = CardDatabase.create();

db.search = BasicSearch.create(db);

module.exports = db;
