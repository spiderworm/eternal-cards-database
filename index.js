const CardDatabase = require('./cards/CardDatabase.js');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

const db = CardDatabase.create();

module.exports = db;
