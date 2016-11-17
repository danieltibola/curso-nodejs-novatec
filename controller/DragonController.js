//controller/DragonController.js
'use strict';

let bluebird = require('bluebird');
let repository = bluebird.promisifyAll(require('../repository/DragonRepository'));

function handleNotFound(message){
	return function(data){
		if(!data){
			let error = new Error(message);
			error.status = 404;
			throw error;
		}
		return data;
	};
}

let handleDragonNotFound = handleNotFound('Dragon not found');

let DragonController = {
	list: function (request, response, next){
		repository.findAsync({})
		.then(function(data){
			response.json(data);
		})
		.catch(next);
	},
	findById: function (request, response, next){
		let id = request.params.id;
		
		repository.findOneAsync({ _id: id })
		.then(handleDragonNotFound)
		.then(function(data){
			response.json(data);
		})
		.catch(next);
	},
	create: function (request, response, next){
		let body = request.body;

		repository.insertAsync(body)
		.then(function(data){
			response.status(201).json(data);
		})
		.catch(function(err){
			err.status = 422;
			next(err);
		});
	},
	update:  function (request, response, next){
		let id = request.params.id;
		let body = request.body;
		
		repository.updateAsync({_id: id}, body)
		.then(function(data){
			response.json(data);
		})
		.catch(next);
	},
	remove: function (request, response, next){
		let id = request.params.id;
		
		repository.removeAsync({_id: id})
		.then(function(data){
			response.sendStatus(204);
		})
		.catch(next);
	} 
};

module.exports = DragonController;