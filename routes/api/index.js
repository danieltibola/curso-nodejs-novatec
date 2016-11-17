//api/index.js
'use strict';

let router = require('express').Router();

router.get('/', function(request, response, next){
	response.send('PONG');
});
router.use('/dragons', require('./dragons'));

module.exports = router;