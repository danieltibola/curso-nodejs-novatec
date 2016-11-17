//DragonRepository.js
'use strict';

let db = require('../config/mongo');
let dragons = db.collection('dragons');

let mongoose = require('../config/mongoose');
let DragonSchema = require('../schema/DragonSchema');
let model = mongoose.model('Dragon', DragonSchema);

let redis = require('../config/redis')
let debug = require('debug')

let DragonRepository = {
	find: function(query, callback){
		model.find(query).exec(callback);
	},
	findOne: function(query, callback){
		redis.get('dtibola:dragon:' + query._id, function(err, data){
			if (data){
				debug('encontrei no redis');
				return callback(null, JSON.parse(data));
			}
			model.findOne(query).exec(function(err, data){
				if (err){
					return callback(err, data);
				}
				callback(null, data);
				redis.set('dtibola:dragon:' + query._id, JSON.stringify(data));			
			});
		})
	},
	insert: function(data, callback){
		let dragon = new model(data);
		dragon.save(callback);
	},
	update: function(query, data, callback){
	//if(query._id){
	//	query._id = db.ObjectId(query._id);
	//}
	//dragons.update(query, {$set: data}, callback);
	model.update(query, {$set: data}).exec(callback);
	},
	remove: function(query, callback){
		//if(query._id){
		//	query._id = db.ObjectId(query._id);
		//}
		//dragons.remove(query, callback);
		model.remove(query).exec(callback);
	},
};

module.exports = DragonRepository;