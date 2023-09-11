import * as fun from "./biblio.js"


 
  let  socket = new WebSocket("ws://localhost:8080/noname");
 
    socket.onopen = function (e) {
        console.log("connected");
    }

    // Listen for messages
socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });
    
// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback){
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                callback();
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket);
            }

        }, 5); // wait 5 milisecond for the connection...
}

function sendMessage(msg){
    // Wait until the state of the socket is not ready and send the message when it is...
    waitForSocketConnection(socket, function(){
        console.log("message sent!!!");
        socket.send(msg);
    });
}

sendMessage("aaaa")
