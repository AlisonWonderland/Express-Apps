var express = require('express');
var fetch = require('node-fetch');


var app = express();
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

var clientID = '4567ebbd17d189643355';
var clientSecret = 'a1e59c33c7cd61f324de669bfb25c667822631db';

// app.get('/welcome', function(){ 
//     res.render(welcome);
// });

app.get('/oauth/redirect', (req, res) => {
    var requestToken = req.query.code;

    fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`, { 
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
        .then(function(response) {
            githubInfo = getGithubInfo(response);
            res.render('welcome', githubInfo);
        })
        .catch(function(error) {
            console.log(error);
        })
});

// Start the server on port 8080
app.listen(8080, function(req, res) {
    console.log("Server started");
});

async function getUserName(token) {
	return fetch('//api.github.com/user', {
			headers: {
				Authorization: 'token ' + token
			}
        })
		.then(function(response){
            console.log(response);
            return response.json();
        })
}

function fetchUser(accessToken) {
    return fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'token ' + accessToken
                }
            });
}

// get all the stats here
function getGithubInfo(response) {
    // this can be put in a funcction called basicInfo. Add another one for languageStats(), totalCommits() including average each day.
    var githubInfo = {
        github_name: response.login,
        num_repos: response.public_repos,
    };
    githubInfo.created_date = new Date(response.created_at).toLocaleString('en-GB', { timeZone: 'UTC', day: 'numeric', year: 'numeric', month: 'long' });
    githubInfo.last_updated = new Date(response.updated_at).toLocaleString('en-GB', { timeZone: 'UTC', day: 'numeric', year: 'numeric', month: 'long' });
    
    return githubInfo;
}
