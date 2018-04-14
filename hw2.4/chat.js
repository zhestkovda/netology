var fs = require('fs');
var express = require('express'); // Подключаем express
var app = express();
var server = require('http').Server(app); // Подключаем http через app
var io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер
var port = 3000;
server.listen(port);
console.log('Start server at port:', port);
app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  	var name = 'U' + (socket.id).toString().substr(1,4); 
  	console.log('New user created:', name);
  	socket.broadcast.emit('newUser', name);
  	socket.emit('userName', name);


  	socket.on('message', function(name, msg){
	    console.log('New message from user' + name + ' | Message: ' + msg);
	    io.sockets.emit('messageToClients', msg, name);
    });
});

io.on('error', function (err) {
	console.log(err);
});