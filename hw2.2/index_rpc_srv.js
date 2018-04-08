const express = require("express");
const bodyparser = require("body-parser");
var rpc = require('json-rpc2');
const port = 3000;
var users = [];

var server = rpc.Server.$create({
    'websocket': true, // is true by default 
    'headers': { // allow custom headers is empty by default 
        'Access-Control-Allow-Origin': '*'
    }
});


server.expose('post', function (args, opts, callback){
	users.push(args);
    callback(null, users);
  }
);

server.expose('get', function (args, opts, callback){
	if(args.name == 'All'){
    	callback(null, users);
	}
	else{
		const name = args.name;
		let val = null;
		users.forEach(function(user){
			if (name == user.name){
				val = user;
			}
		});
		if(val){
			callback(null, val);
		}
		else{
			callback(404, null);
		}		
	}
});


server.expose('delete', function (args, opts, callback){
	let name = args.name;
	let exist; 
	users.forEach(function(user, index, object){
		if (name == user.name){
			users.splice(index, 1);
			//users[index] = null;
			exist = 1;
		}
	});		
	if(!exist){
		callback(404, null);
	}
	callback(null, users);
});


server.expose('put', function (args, opts, callback){
	const name = args.name;
	let val = null;
	users.forEach(function(user, index, object){
		if (name == user.name){
			users[index] = Object.assign(users[index], args);
			val = users[index];
		}
	});
	if(val){
		callback(null, users);
	}
	else{
		callback(404, null);
	}
});


server.listen(port, 'localhost');
console.log('Server start on port: ', port)