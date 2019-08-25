var express = require("express");
var faker = require("faker");
var mysql = require("mysql");
var body_parse = require("body-parser");
var nodemailer = require('nodemailer');
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(body_parse.urlencoded({extended: true}));


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'join_us'
});

connection.connect();

app.get("/", function(req, res) {
    connection.query('SELECT COUNT(*) AS total_users FROM users', function (error, results, fields) {
        if (error) throw error;
        var total_users = results[0].total_users;
        var deadly = "deadly";
        res.render("home", {count:total_users});
    });
});

app.post("/register", function(req, res) {
    console.log(req.body.email);
    var user_email = [[req.body.email]];
    connection.query("INSERT INTO users (email) VALUES ?", [user_email], function (error, results, fields) {
        if (error) throw error;
        console.log("Added email");
    });
    sendEmail(user_email);
    res.redirect("/");
});

app.get("/joke", function(req, res) {
    res.send("Knock knock");
});


app.listen(3000, function() {
    console.log("Server started");
});

// async..await is not allowed in global scope, must use a wrapper
async function sendWelcomeEmail(user_email) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'dimitridawn@gmail.com', 
            pass: 'Pulgoso2012!'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'dimitridawn@gmail.com', // sender address
        to: user_email, // list of receivers
        subject: '#(#@_(%#(@($', // Subject line
        text: 'Welcome', // plain text body
        html: 
        '<p>There are many places to go. Though going right is right and going left is wrong.' + 
        'What you\'re seeking is the demon.</p>' +
        '<a href="https://libraryofbabel.info/book.cgi?qj-w3-s3-v10:1">See where it takes you.</a>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);