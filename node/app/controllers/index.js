var Movie = require("../models/movie");
exports.index = function(req,res){
	Movie.fetch(function(error,movies){
		if(error){
			console.log(error);
		}
		res.render('index', {
			title: 'imooc ��ҳ',
			movies: movies
		});
	});
};