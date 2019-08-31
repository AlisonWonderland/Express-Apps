var socket = io();
var repos_ul = document.querySelector(".repos");

console.log("hi");
socket.on('connected', function(msg) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    repos_ul.appendChild(li);
});