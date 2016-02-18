//package
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var port = process.env.PROT || 3000;
var app = express();
mongoose.connect("mongodb://localhost/imooc");
app.set("views","./app/views/pages");
app.set("view engine","jade");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));//pages
app.use('/public', express.static(__dirname + '/public'));//static
app.locals.moment = require('moment');
require("./config/routes")(app);
app.listen(port);
console.log("listen on port "+port);
