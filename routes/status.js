var express = require('express');
var router = express.Router();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



router.get('/', function(req, res, next) {
  io.sockets.emit("incomingMessage", {
    status:"oK"
  });
  res.render('status', { title: 'status' });
});

module.exports = router;
