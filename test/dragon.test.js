//dragon.test.js
'use strict'
let app = require('../app');
let request = require('supertest')(app);
let debug = require('debug')('curso:test:dragon');
let assert = require('assert');
let db = require('../config/mongo');

describe('Dragon CRUD', function(){
	let _id;

	beforeEach(function(done){
		let dragon = {name: 'Tiamat', age: 1502};
		db.collection('dragons').insert(dragon, function(err, data){
			_id = data._id.toString();

			done();
		});
	});

	it('should list all dragons', function(done){
		request
		.get('/api/dragons')
		.end(function(err, response){
			debug(response.status, response.body);

			assert.equal(response.status, 200);
			assert.ok(Array.isArray(response.body));
			assert.ok(response.body.length > 0);
			done();
		});
	});

	it('should find one dragon', function(done){
		request
		.get('/api/dragons/' + _id)
		//.get(`/api/dragons/${_id}`)
		.end(function(err, response){
			debug(response.body);

			assert.equal(response.status, 200);
			assert.deepEqual(response.body, 
			{ 
				_id: _id, 
				name: 'Tiamat', 
				age: 1502,
				histories: []
			}
			);
			done();
		});
	});

	it('should create one dragon', function(done){
		request.post('/api/dragons')
		.send({name: 'Charizard'})
		.end(function(err,response){

			assert.equal(response.status, 201);
			assert.equal(response.body.name, 'Charizard');
			done();
		});
	});

	it('should update one dragon', function(done){
		let type = 'Water' + Math.random();
		request
		.put('/api/dragons/' + _id)
		.send({ type: type})
		.end(function(err, response){
			debug(response.status);
			debug(response.body);

			assert.equal(response.status, 200);
			assert.deepEqual(response.body, {ok:1, nModified:1, n:1});
			done();

		})
	});

	it('should remove one dragon', function(done){
		request
		.delete('/api/dragons/' + _id)
		.end(function(err, response){
			assert.equal(response.status, 204)
			done();
		});
	});
});