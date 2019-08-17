var express = require("express")
var app = express()
var bodyParser = require("body-parser"); // Need to install to work with req.body

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = ["Tony", "Sol", "Author", "Ares"];

app.get("/", function(req,res) {
    res.render("home");
});

app.post("/addfriend", function(req,res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.get("/prac/:end", function(req, res) {
    var val = req.params.end;
    res.render("prac", {value:val});
});

app.listen(8081, function() {
    console.log("Starting server");
});