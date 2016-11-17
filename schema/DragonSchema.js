//DragonScrema.js

'use strict';
let mongoose = require('../config/mongoose');
let DragonSchema = mongoose.Schema({
	name: {type:String, trim: true, maxlength: 50, required: true},
	age: {type: Number, min:1, max: 5000},
	type: {type: String, enum: ['Water', 'Fire', 'Witch', 'Hydra', 'Dog']},
	histories: [String]
});

module.exports = DragonSchema;