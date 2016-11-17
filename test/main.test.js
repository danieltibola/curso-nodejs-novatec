//main.test.js
'use strict'

let app = require('../app');
let request = require('supertest')(app);
let debug = require('debug')('curso:test:main');
let assert = require('assert');

describe('Main Routes', function(){
	it('GET /home', function(done){
		request
		.get('/')
		.end(function(err, response){
			assert.equal(response.status, 401);
			assert.deepEqual(response.body, {
				name: 'Daniel',
				familyName: 'Tibola'	
			});
			assert.equal(response.text, '{"name":"Daniel","familyName":"Tibola"}'); 
			debug(response.status, response.body, response.text);
			done();
		});
	});
	
	it('GET /not-found should return 404', function(done){
		request
		.get('/not-found')
		.end(function(err, response){
			assert.equal(response.status, 404);
			debug(response.text, response.body);
			done();
		});
	});
	
});