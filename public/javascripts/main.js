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

    if(data.status == "executing"){
      $("b[target="+data.progress+"]").css("background-color",'#ff9900').text(Math.round(data.percentage * 10000) / 100+"%");
    }

    if(data.status == "executed"){
      $("b[target="+data.progress+"]").css("background-color",'blue').text("Done");
    }
  });

  socket.on("newTask", function(){
    window.location.reload();
  });


}

$(document).on('ready', function(){
  init();

  $('#btn').click(function(){
    console.log("OK");
    $.ajax({
      url: '140.119.19.19:6892',
      data: {
        appId : $('#data').val()
      },
      type:"POST",
      dataType:'jsonp',
      success: function(msg){
          console.log("OK");
      },
       error:function(xhr, ajaxOptions, thrownError){
          alert(xhr.status);
          alert(thrownError);
       }
    });
  });
});
