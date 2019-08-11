var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/endpoint/:endpoint", function(req, res){
    var endpoint = req.params.endpoint;
    res.render("love.ejs", {endpoint: endpoint, text: "This is some text in an h2"});
});

app.get("/posts", function(req,res) {
    var posts = [
        {title: "Post 1", author:"Susy"},
        {title: "Wowee", author:"Poshe"},
        {title: "I know write", author:"Surei"}
    ];

    res.render("posts.ejs", {posts: posts});
});

app.listen(3000, function() {
    console.log("hello");
});