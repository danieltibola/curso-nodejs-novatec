//mongo.js
'use strict';

let config = require('config');
let mongojs = require('mongojs');
//let db = mongojs('user@pass:server:port/database')

let server = config.get('mongo.server');
let port = config.get('mongo.port');
let database = config.get('mongo.database');

//concatenar com crase.
let db = mongojs(`${server}:${port}/${database}`);

module.exports = db;