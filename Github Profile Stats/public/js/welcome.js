var socket = io();
var repos_ul = document.querySelector(".repos");
var repos_container = document.querySelector(".repos-container");
var color_list = ['#ffffb1', '#b1ffb1', '#ffb265', '#b1b1ff', '#ffd8b1', '#b1ffff', '#fefeff', '#a343ff']

// Add the repo info to the page
socket.on('repo info received', function(data) {
    var info_div = document.createElement("div");
    var h2 = document.createElement("h2");
    var span = document.createElement("span");

    h2.innerText = data.repo_name;
    h2.classList.add("repo-name");
    info_div.appendChild(h2);

    var languages = Object.keys(data.languageData); 
    var percentages = Object.values(data.languageData);

    if(languages.length === 0) {
        span.innerText = "No code in this repo/Empty repo";
        span.classList.add("repo-language");
        info_div.appendChild(span);
    }

    else {
        for(var i = 0; i < languages.length; ++i) {
            // Maybe put this in a function
            span = document.createElement("span"); 
            span.innerText = languages[i] + " " +  percentages[i] + "%\n";
            span.classList.add("repo-language");
            info_div.appendChild(span);
            // Add bar. Currently adding pars to webpage
            info_div.append(addPercentBar(percentages[i]));
        }
    }
    
    info_div.classList.add("repo-info");
    repos_container.appendChild(info_div);
});

function addPercentBar(percentage) {
    var whole_bar = document.createElement("div");
    whole_bar.setAttribute("id", "whole-bar");

    var percentage_bar = document.createElement("div");
    percentage_bar.setAttribute("id", "percentage-bar");
    // percentage.setAttribute("style");

    whole_bar.appendChild(percentage_bar);

    return whole_bar;
}