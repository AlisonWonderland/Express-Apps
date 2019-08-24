var express = require("express");
var faker = require("faker");
var mysql = require("mysql");
var body_parse = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//          https://www.npmjs.com/package/nodemailer

app.use(body_parse.urlencoded({extended: true}));


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'join_us'
});

connection.connect();

app.get("/", function(req, res) {
    // We have count users in out database
    connection.query('SELECT COUNT(*) AS total_users FROM users', function (error, results, fields) {
        if (error) throw error;
        var total_users = results[0].total_users;
        var deadly = "deadly";
        res.render("home", {count:total_users, deadly:deadly});
    });
});

app.post("/register", function(req, res) {
    console.log(req.body.email);
    var user_email = [[req.body.email]];
    connection.query("INSERT INTO users (email) VALUES ?", [user_email], function (error, results, fields) {
        if (error) throw error;
        console.log("Added email");
    });
    res.redirect("/");
});

app.get("/joke", function(req, res) {
    res.send("Knock knock");
});


app.listen(3000, function() {
    console.log("Server started");
});