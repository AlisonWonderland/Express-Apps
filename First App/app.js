var express = require("express");
var app = express();

/* all comments are notes */

/*
get(url/path, callback function)
request and response are objects. Request stores information about the req.
Response will store info about our res.
*/
app.get("/", function(request, response) {
    response.send("Hi there! <p>New text</p> <p>New NEWER text</p> <p>New text</p>");
});

app.get("/bye", function(request, response) {
    response.send("Goodbye!");
});

app.get("/dog", function(request, response) {
    response.send("Meow");
});

app.get("/dog/:breed", function(request, response) {
    var breed = request.params.breed;
    response.send("Welcome to the page about the " + breed + " page");
});

// '*' refers to any endpoint/route that is not included above. IOW paths that don't exist.
//Useful to show a 404 warning page/html template. Shouldn't put this above the other routes.
app.get("*", function(req, res){
    res.send("You're a STAR!!!");
});

// Tell express to listen to requests(start server);
app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
});