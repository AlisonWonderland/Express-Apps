var express = require('express');
var app = express();
var fetch = require('node-fetch');
var http = require('http').createServer(app);
var io = require('socket.io')(http);



app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.set("view engine", "ejs");

var clientID = '4567ebbd17d189643355';
var clientSecret = '2163bb3cd1c103c1bb2d0ce5fc312955448e05e6';
var clientInfo =`?client_id=${clientID}&client_secret=${clientSecret}`;

// app.get('/welcome', function(req, res) {
//     res.render("welcome");
// });

app.get('/oauth/redirect', (req, res) => {
    var requestToken = req.query.code;

    fetch('https://github.com/login/oauth/access_token' + clientInfo + `&code=${requestToken}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var accessToken = response.access_token;
            return fetchUser(accessToken);
        })
        .then(function(response) {
            return response.json();
        })
        .then(async function(response) {
            githubInfo = await getGithubInfo(response);
            res.render('welcome', githubInfo);
            // res.render('welcome', {github_name: "Name"});
            io.on('connection', function(socket){
                for(var i = 0; i < 100; ++i) {
                    socket.emit('connected', "msg");
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        })
});

// Start the server on port 8080
// app.listen(8080, function(req, res) {
//     console.log("Server started");
// });

http.listen(8080, function(){
    console.log('listening on *:8080');
});

function fetchUser(accessToken) {
    return fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'token ' + accessToken
                }
            });
}

// get all the stats here
async function getGithubInfo(response) {
    var githubInfo = {
        github_name: response.login,
        num_repos: response.public_repos,
        created_date: formatDate(response.created_at), 
        last_updated: formatDate(response.updated_at)
        // repo_info: await getRepoInfo(response.repos_url) // returns names right now
    };    
    return githubInfo;
}

function formatDate(date) {
    return new Date(date).toLocaleString('en-GB', { timeZone: 'UTC', day: 'numeric', year: 'numeric', month: 'long' });
}

async function getRepoInfo(repos_url) {
    var response = await fetch(repos_url + clientInfo)
                    .then(function(response) {
                        return response;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
    
    var repos = await response.json();
    var repoInfo = [];

    for(var i = 0; i < repos.length; ++i) {
        repoInfo.push({name: repos[i].name, languages: await getLanguageData(repos[i].languages_url)});
    }
    
    return repoInfo;
}

async function getLanguageData(languages_url) {
    var response = await fetch(languages_url + clientInfo)
                    .then(function(response) {
                        return response;
                    });
    
    var languageResponse = await response.json();
    // Note: These two return arrays
    var languages = Object.keys(languageResponse); 
    var bytes = Object.values(languageResponse);

    var totalBytes = 0;
    for(var i = 0; i < bytes.length; ++i) {
        totalBytes += bytes[i];
    }

    // Adding percentages
    var languageData = {};
    for(var i = 0; i < languages.length; ++i) {
        languageData[languages[i]] = Math.round(bytes[i] / totalBytes * 10000) / 100 ; // Need to add percentage
    }

    return languageData;
}

// Make a function with the list of all the languages used ordered by number of bytes, use charts
// Add loading screen.
// Add a form to look up usernames


// +++++++++++BIG ONE +++++++++++++
// ADD SLOW LOADING
// RENDER ONE PART LIKE THE BASIC INFO 
// AND THEN RENDER EACH REPO INFO ONE BY ONE
// OR ADD SKELETON SCREEN/LOADING ANIMATION
// MORE DETAILS HERE https://medium.com/flawless-app-stories/everything-you-need-to-know-about-loading-animations-10db7f9b61e

// <% for(var i = 0; i < repo_info.length; ++i) { %>
//     <div>
//         <p> <%= repo_info[i].name %> </p> 
//         <% var languages = Object.keys(repo_info[i].languages); %>
//         <% var percentages = Object.values(repo_info[i].languages); %>
//         <% for(var j = 0; j < languages.length; ++j) { %>
//             <p> <%= languages[j] %> : <%= percentages[j] %> % </p>
//         <% } %>
//     </div>
// <% } %>