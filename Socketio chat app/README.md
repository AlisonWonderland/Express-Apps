# Chat app
Intro chat app to get familiar with socket.io since I'll be needing socket.io for [another project of mine](https://github.com/AlisonWonderland/Express-Apps/tree/master/Github%20Profile%20Stats). 

It currently just displays the messages that users type.

## Notes 
* emit() functions will send data to the other side of the client-server relation. Meaning that emit()functions in the server side code, in this case app.js, will send data over to the socket.on() event listeners in the client code, the JS in index.html.