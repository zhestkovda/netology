const MongoClient = require('mongodb').MongoClient;
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const port = 3000;
//var   url = "mongodb://localhost:27017/";
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/testdb');
var db = mongoose.connection;
var Schema = mongoose.Schema;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',function(){
	console.log('Connection with database established!');
});

const app = express();
app.use(bodyparser.json());


userSchema  = new Schema({
	name: String
});
var User = mongoose.model('User', userSchema);

taskSchema  = new Schema({
	name: String,
	description: String,
	status: Boolean,
	user: String
});
var Task = mongoose.model('Task', taskSchema);
/*
{
"users":["Dima","Ivan","Vasya","Anna","Oleg"],

"tasks":[{"name":"task1", "desc":"bla-bla", "status":"open", "user":"Dima"},
		 {"name":"task2", "desc":"important", "status":"close", "user":"Anna"},
		 {"name":"task3", "desc":"last priority", "status":"open", "user":"Dima"}] 
}
*/

app.get('/users', (req,res) => { // send all users
	console.log('GET /users');
	// get all the users
	User.find({}, function(err, users) {
	  if (err) throw err;

	  // object of all the users
	  console.log(users);
	  res.send(users);
	});
	
});

app.post('/users', (req,res) => {
	console.log('POST /users');
	//const name = req.params.name
	var newUser  = new User({
	  name: req.body.name
	});
	// save the user
	newUser.save(function(err) {
	  if (err) throw err;
	  console.log('User created!');
	});
	res.send();	
});

app.put('/users/update', (req,res) => {
	console.log('PUT /users');
	User.findById(req.body.id, function(err, user) {
	  if (err) throw err;
	  // change the users location
	  user.name = req.body.name;
	  // save the user
	  user.save(function(err) {
	    if (err) throw err;
	    console.log('User successfully updated!');
	    res.send();
	  });
	});
});

app.delete('/users/delete', (req,res) => {
	console.log('DELETE /users');
	User.findOneAndRemove({ name: req.body.name }, function(err) {
	  if (err) throw err;

	  // we have deleted the user
	  res.send();
	  console.log('User deleted!');
	});
});

///////////////////////////////////////////////////////////////////////////////////
/*
{
"users":["Dima","Ivan","Vasya","Anna","Oleg"],

"tasks":[{"name":"task1", "desc":"bla-bla", "status":"open", "user":"Dima"},
		 {"name":"task2", "desc":"important", "status":"close", "user":"Anna"},
		 {"name":"task3", "desc":"last priority", "status":"open", "user":"Dima"}] 
}
*/

app.get('/tasks', (req,res) => { // send all users
	console.log(req.body.name);
	// get all the users
	Task.find({}, function(err, tasks) {
	  if (err) throw err;
	  // object of all the users
	  console.log(tasks);
	  res.send(tasks);
	});
	
});

app.post('/tasks', (req,res) => {
	console.log('POST /tasks');
	//const name = req.params.name
	var newTask  = new Task({
	  	name: req.body.name,
		description: req.body.description,
		status: req.body.status,
		user: req.body.user
	});
	// save the user
	newTask.save(function(err) {
	  if (err) throw err;
	  console.log('Task created!');
	});
	res.send();	
});

app.put('/tasks/update', (req,res) => {
	console.log('PUT /tasks');
	Task.findById(req.body.id, function(err, task) {
	  if (err) throw err;
	  // change the users location
	  task.name = req.body.name;
	  task.description = req.body.description;
	  task.status = req.body.status;
	  task.user = req.body.user;
	  // save task
	  task.save(function(err) {
	    if (err) throw err;
	    console.log('Task successfully updated!');
	    res.send();
	  });
	});
});

app.delete('/tasks/delete', (req,res) => {
	Task.findOneAndRemove({ name: req.body.name }, function(err) {
	  if (err) throw err;
	  // we have deleted the user
	  res.send();
	  console.log('Task deleted!');
	});
});
//////////////////////////////////////////////////////////////////
app.put('/tasks/open', (req,res) => {
	console.log('PUT /tasks/open');
	Task.findOne({ name: req.body.name }, function(err, task) {
	  if (err) throw err;
	  task.status = true;
	  // save task
	  task.save(function(err) {
	    if (err) throw err;
	    console.log('Task successfully opened!');
	  });
	});
	res.send();
});

app.put('/tasks/close', (req,res) => {
	console.log('PUT /tasks/close ');
	Task.findOne({ name: req.body.name }, function(err, task) {
	  if (err) throw err;
	  task.status = false;
	 
	  task.save(function(err) {
	    if (err) throw err;
	  console.log('Task successfully closed!');
	  });  
	});
	res.send();
});

app.put('/tasks/delegate', (req,res) => {
	console.log('PUT /tasks/delegate');
	Task.findOne({ name: req.body.name }, function(err, task) {
	  if (err) throw err;
	  task.user = req.body.user;
	  // save task
	  task.save(function(err) {
	    if (err) throw err;
	    console.log('Task successfully delegated!');
	  });
	});
	res.send();
});

app.put('/tasks/search', (req,res) => {
	console.log('PUT /tasks/search' + ' ' + req.body.name + ' ' + req.body.description);
	var result;
	if (req.body.name != undefined)
	{
		Task.find({ name: req.body.name }, function(err, tasks) {
		  if (err) throw err;
		  console.log('Task search completed!');
		  res.send(tasks);
		});
	}
	else
	{
		if (req.body.description != undefined)
		{
			Task.find({ description: req.body.description }, function(err, tasks) {
			  if (err) throw err;
			  console.log('Task search completed!');
			  res.send(tasks);
			});
		}
		else{
			res.send();
		}
	}
});



app.listen(port);
console.log('Server start on port: ', port)