//routes/index.js
'use strict';

let router = require('express').Router();
let MainController = require('../controller/MainController');

//http://localhost:3000?q=lalalala
router.get('/', MainController.index);
router.get('/home', MainController.home);

router.get('/outrogato', MainController.outrogato);
router.use('/api', require('./api'));

module.exports = router;