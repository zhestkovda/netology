const express = require("express");
const bodyparser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyparser.json());

let users = [];
let name;
let score;

app.get('/users/', (req,res) => {
	const result = users.filter(user => user);
	res.json(result);
});

app.get('/users/:name', (req,res) => {
	const name = req.params.name;
	let val = null;
	users.forEach(function(user){
		if (name == user.name){
			val = user;
		}
	});
	if(val){
		res.json(val);
	}
	else{
		res.status(404);
		res.send();
	}
});

app.post('/users/', (req,res) => {
	users.push(req.body);
	res.send();	
});

app.put('/users/:name', (req,res) => {
	console.log(req.body);
	const name = req.params.name;
	let val = null;
	users.forEach(function(user, index, object){
		if (name == user.name){
			users[index] = Object.assign(users[index], req.body);
			val = users[index];
		}
	});
	if(val){
		res.json(val);
	}
	else{
		res.status(404);
		res.send();
	}
});

app.delete('/users/:name', (req,res) => {
	let name = req.params.name;
	let exist; 
	users.forEach(function(user, index, object){
		if (name == user.name){
			users[index] = null;
			//object.splice(index, 1);
			exist = 1;
		}
	});		
	if(!exist){
		res.status(404);
	}
	res.send();
});

app.listen(port);
console.log('Server start on port: ', port)