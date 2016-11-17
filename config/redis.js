//config/redis.js

'use strict'

let redis = require('redis');
let client = redis.createClient({
	host: '10.0.1.43',
	port: 6379
});

module.exports = client;