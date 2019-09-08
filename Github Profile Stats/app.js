var express = require('express');
var app = express();
var fetch = require('node-fetch');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));
app.set("view engine", "ejs");

var clientID = '4567ebbd17d189643355';
var clientSecret = '2163bb3cd1c103c1bb2d0ce5fc312955448e05e6';
var clientInfo =`?client_id=${clientID}&client_secret=${clientSecret}`;



// This is run when a user visits a page.
// I'm storing the socket so that I can send data to the right webpage aka the page that displays the profile
// information.
var socket = 0;
io.on('connection', async function(currSocket) {
    socket = currSocket;
    console.log("connected");
});

app.post('/search-user', async function(req, res) {
    await githubRequest();
    console.log('Data displayed');
});

// Redirect url route. Taken after user accepts authorization in Oauth page.
app.get('/oauth/redirect', function(req, res) {
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

            await getRepoInfo(response.repos_url);
        })
        .catch(function(error) {
            console.log(error);
        })
});

// app.listen doesn't work here
http.listen(8080, function() {
    console.log('listening on *:8080');
});


//      ******* HELPER FUNCTIONS ********

// This to fetch the user if they choose to sign-in.
function fetchUser(accessToken) {
    return fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'token ' + accessToken
                }
            });
}

async function getGithubInfo(response) {
    var githubInfo = {
        github_name: response.login,
        num_repos: response.public_repos,
        created_date: formatDate(response.created_at), 
        last_updated: formatDate(response.updated_at)
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

    for(var i = 0; i < repos.length; ++i) {
        socket.emit('repo info received', 
                    {
                        repo_name: repos[i].name, 
                        languageData: await getLanguageData(repos[i].languages_url)
                    });
    }
    return;
}

// Returns an array with the name of the languages used and the percentage of bytes each language takes up
async function getLanguageData(languages_url) {
    var response = await fetch(languages_url + clientInfo)
                    .then(function(response) {
                        return response;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
    
    var languagesJSON = await response.json();

    // Note: These two return arrays
    var languages = Object.keys(languagesJSON); 
    var bytes = Object.values(languagesJSON);

    var totalBytes = 0;
    for(var i = 0; i < bytes.length; ++i) {
        totalBytes += bytes[i];
    }

    // Adding usage percentage of each language
    var languageData = {};
    for(var i = 0; i < languages.length; ++i) {
        // Rounding to the nearest one-hundreth
        languageData[languages[i]] = Math.round(bytes[i] / totalBytes * 10000) / 100 ;
    }

    return languageData;
}

// Add loading screen.
// Add a form to look up usernames
