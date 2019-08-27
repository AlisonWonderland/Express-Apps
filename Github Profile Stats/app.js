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
        .then(async function(response) {
            githubInfo = await getGithubInfo(response);
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

function fetchUser(accessToken) {
    return fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'token ' + accessToken
                }
            });
}

// get all the stats here
async function getGithubInfo(response) {
    // this can be put in a funcction called basicInfo. Add another one for languageStats(), totalCommits() including average each day.  
    var githubInfo = {
        github_name: response.login,
        num_repos: response.public_repos,
        created_date: formatDate(response.created_at), 
        last_updated: formatDate(response.updated_at),
        repo_info: await getRepoInfo(response.repos_url) // returns names right now
    };    
    return githubInfo;
}

function formatDate(date) {
    return new Date(date).toLocaleString('en-GB', { timeZone: 'UTC', day: 'numeric', year: 'numeric', month: 'long' });
}

async function getRepoInfo(repos_url) {
    var response = await fetch(repos_url)
                    .then(function(response) {
                        return response;
                    });
    
    var repos = await response.json();
    var repoNames = [];

    for(var i = 0; i < repos.length; ++i) {
        repoNames.push({name: repos[i].name});
        // repoNames.push({name: repos[i].name, languageData: getLanguageData(repos[i].languages_url)});
        await getLanguageData(repos[i].languages_url);
    }
    // console.log(repoNames); delete both
    // , languages: getLanguages(repos[i].languages_url){language, percentage}}
    
    return repoNames;
}

async function getLanguageData(languages_url) {
    var response = await fetch(languages_url)
                    .then(function(response) {
                        return response;
                    });
    
    var languageResponse = await response.json();
    var languages = Object.keys(languageResponse);
    var bytes = Object.values(languageResponse);

    console.log(languages);
    console.log(bytes);
    var totalBytes = 0;
    // Calculating total bytes of the files in repos
    for(var i = 0; i < bytes.length; ++i) {
        totalBytes += bytes[i];
    }

    // Adding percentages
    var languageData = {};
    for(var i = 0; i < languages.length; ++i) {
        languageData[languages[i]] = Math.round(bytes / totalBytes * 10000) / 100 ; // Need to add percentage
    }
    
    return languageData;
}

// Make a function with the list of all the languages used ordered by number of bytes, use charts
// Add loading screen.
// Add a form to look up usernames