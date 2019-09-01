var socket = io();
var repos_ul = document.querySelector(".repos");
var repo_container = document.querySelector(".repo-container");

// Add the repo info to the page
socket.on('repo info received', function(data) {
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var span = document.createElement("span");

    h2.innerText = data.repo_name;
    div.appendChild(h2);

    var languages = Object.keys(data.languageData); 
    var percentages = Object.values(data.languageData);

    if(languages.length === 0) {
        span.innerText = "No code in this repo/Empty repo";
        div.appendChild(span);
    }

    else {
        for(var i = 0; i < languages.length; ++i) {
            span = document.createElement("span"); 
            span.innerText = languages[i] + " " +  percentages[i] + "%\n";
            div.appendChild(span);
        }
    }
    
    div.classList.add("repo-info");
    repo_container.appendChild(div);
});