var express = require("express");
var app = express();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search")
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function (error, response, body) {
    console.error('error:', error); 
    console.log('statusCode:', response && response.statusCode);
    var data = JSON.parse(body);
    res.render("results", {data: data}); 
});
});

app.listen(3000, function() {
    console.log("Server started");
});
