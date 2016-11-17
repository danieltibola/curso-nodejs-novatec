//config.mongoose.js

'use stricts'

let mongoose = require('mongoose');
let config = require('config');

let server = config.get('mongo.server');
let port = config.get('mongo.port');
let database = config.get('mongo.database');

//concatenar com crase.
let db = mongoose.connect(`${server}:${port}/${database}`);

module.exports = mongoose;
