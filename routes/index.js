
var express = require('express');
module.exports = function(io){
  //now you can use io.emit() in this file
  var router = express.Router();
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    io.sockets.emit('socket1', {status:"ok"});
  });

  router.post('/status', function(req, res){
    io.sockets.emit('socket1', req.body);
    res.json({
      status:"OK"
    });
  });

  router.post('/status/init', function(req, res){
    console.log(req.body);
    io.sockets.emit('socket1', req.body);
    res.json({
      status:"OK"
    });
  });




    return router;
 };
