var express = require('express');
var fs = require('fs');
module.exports = function(io){
  //now you can use io.emit() in this file
  var router = express.Router();

  router.get('/', function(req, res, next) {
    var obj = JSON.parse(fs.readFileSync('DataCache/temp.json', 'utf8'));
    res.render('index', {
      cache : obj
    });
  });

  router.post('/status/init', function(req, res){
    fs.writeFile('DataCache/temp.json', JSON.stringify(req.body),function(err){
      if(!err){
        io.sockets.emit('newTask', req.body);
        res.json({
          status:"OK"
        });
      }
    });
  });

  router.post('/status', function(req, res){
    console.log(req.body);
    io.sockets.emit('socket1', req.body);
    res.json({
      status:"OK"
    });
  });






    return router;
 };
