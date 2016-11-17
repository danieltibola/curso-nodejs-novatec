//routes/api/dragons.js

'use strict';

let router = require('express').Router();
let DragonController = require('../../controller/DragonController');

router.get('/', DragonController.list);
router.get('/:id', DragonController.findById);
router.post('/', DragonController.create);
router.put('/:id', DragonController.update);
router.delete('/:id', DragonController.remove);

function validateParamId(request, response, next){
	let id = request.params.id;
	if(id.length !== 24){
		let error = new Error ('Invalid Id');
		error.status = 400;
		return next(error);
	}
	next();
}

module.exports = router;