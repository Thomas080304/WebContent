var _ = require("underscore");
var Movie = require("../models/movie");
/*detail*/
exports.detail = function(req, res){
	var id = req.params.id;
	Movie.findById(id,function(error,movie){
		if(error){
			console.log(error);
		}
		res.render('detail', {
			title: 'imooc 详情',
			movie: movie
		});
	});
};
/*admin /admin/movie/new*/
exports.save =function(req, res){
	res.render('admin', {
		title: 'imooc 后台录入页',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	})
};
/*post data*/
exports.new =function(req, res){
	var movePost = req.body.movie;
	var id = req.body.movie._id;
	var _movie;
	if(id !== 'undefined'){
		Movie.findById(id,function(error,movie){
			if(error){
				console.log(error);
			}
			_movie = _.extend(movie,movePost);	
			_movie.save(function(error,movie){
				if(error){
					console.log(error);
				}
				res.redirect("/movie/"+movie._id);
			});
		});
		
	}else{
		_movie = new Movie({
			doctor: movePost.doctor,
			country: movePost.country,
			title: movePost.title,
			year: movePost.year,
			poster: movePost.poster,
			language: movePost.language,
			flash: movePost.flash,
			summary: movePost.summary
		});
		_movie.save(function(error,movie){
			if(error){
				console.log(error);
			}
			res.redirect("/movie/"+movie._id);
		});
	}
	
};
exports.update =function(req, res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(error,movie){
			if(error){
				console.log(error);
			}
			res.render('admin', {
				title: 'imooc 后台录入页',
				movie: movie
			});
		});
	}
};
//list
exports.list =function(req, res){
	Movie.fetch(function(error,movies){
		if(error){
			console.log(error);
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		});
	});
};

exports.del =function(req, res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id:id},function(error,movie){
			if(error){
				console.log(error);
			}else{
				res.json({success:1});
			}
		});
	}
};
