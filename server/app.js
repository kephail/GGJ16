var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Printer = require('./print');

var port = 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

Printer.ready(function(printer){

  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('readBarcode', function(barcode){
      console.log('barcode read in: ' + barcode);
    });

    socket.on('barcode', function(barcode){
      console.log('barcode set to print: ' + barcode);

      Printer.barcode(printer, barcode, function(){
        console.log('done');
      });
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });


  http.listen(port, function(){
    console.log('listening on *:' + port);
  });

});
