var Movie = require("../app/controllers/movie");
var Index = require("../app/controllers/index");
module.exports = function(app){
	app.get("/",Index.index);
	app.get("/movie/:id",Movie.detail);
	app.get("/admin/movie",Movie.save);
	app.post("/admin/movie/new",Movie.new);
	app.get("/admin/update/:id",Movie.update);
	app.get("/admin/list",Movie.list);
	app.delete("/admin/list",Movie.del);
};
