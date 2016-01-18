function init() {
  var serverBaseUrl = document.domain;
  /*
   On client init, try to connect to the socket.IO server.
   Note we don't specify a port since we set up our server
   to run on port 8080
  */
  var socket = io.connect(serverBaseUrl);

  //We'll save our session ID in a variable for later
  var sessionId = '';

  /*
 When the client successfully connects to the server, an
 event "connect" is emitted. Let's get the session ID and
 log it.
  */
  socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    socket.emit('newUser', sessionId);
    console.log('Connected ' + sessionId);
  });

  socket.on("update", function(data){
    console.log(data);
    if(data.status == "execute"){
      $("b[target="+data.progress+"]").css("background-color",'green').text("Processing");
    }
    if(data.status == "executed"){
      $("b[target="+data.progress+"]").css("background-color",'blue').text("Done");
    }
  });

  socket.on("newTask", function(){
    window.location.reload();
  });
}

$(document).on('ready', init);
