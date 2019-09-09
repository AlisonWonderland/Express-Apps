var socket = io();
var errorDisplay = document.getElementById("error-message");

socket.on('fetch error', function(error) {
    var errorMSG = document.createElement("p");
    errorMSG.innerText = error.msg;
    errorMSG.classList.add("error-message");
    errorDisplay.appendChild(errorMSG);
});