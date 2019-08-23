var faker = require("faker");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'join_us'
});

connection.connect();

// SELECTING DATA

// connection.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//     for(var i = 0; i < results.length; ++i) {
//         console.log(results[i]["email"], results[i]["created_at"]);
//     }
// });


// INSERTING DATA

// var q = 'INSERT VALUES INTO users(email) VALUES ("jiggy@hotmai.com")'
// connection.query(q, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });


// INSERTING DATA 2

// var q = 'INSERT INTO users SET ?';
// var person = {email: faker.internet.email(), created_at: faker.date.past()};
// connection.query(q, person, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// });

// INSERTING lots of data
var q = 'INSERT INTO users (email, created_at) VALUES ?';
var users = [];
for(var i = 0; i < 500; ++i) {
    users.push([
        faker.internet.email(), 
        faker.date.past() 
    ]);
}

connection.query(q, [users], function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});


   
connection.end(function(error) {
    if (error) throw error;
});
  