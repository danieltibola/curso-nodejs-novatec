//MainController.js
'use strict';

let MainController = {
	index: function (request, response, next){
		let q = request.query.q;
		response.status(401);
		response.send({
			name: 'Daniel',
			familyName: 'Tibola',
			q: q	
		});
	},
	outrogato: function (request, response, next){
		response.send('Miauuuu');
	},
	home: function(request, response, next){
		response.render('home', {
			title: 'Minha Página no .kit.net',
			items: [
			1,
			2,
			3,
			4,
			6,
			7,
			8,
			9
			]
		});
	}
};

module.exports = MainController;
