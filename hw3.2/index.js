const MongoClient = require('mongodb').MongoClient;
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const port = 3000;
var   url = "mongodb://localhost:27017/";

const app = express();
app.use(bodyparser.json());

var users = [];
var name;
var surname;
var phone;

app.get('/', function(req, res) {     // load initial index.html page
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/add', function(req, res) { //add contact
    console.log(req.query.name);
    name = req.query.name;
    surname = req.query.surname;
    phone = req.query.phone;
    var myobj = { "name": name , "surname": surname, "phone": phone };
    MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			collection.insertOne(myobj, function(err,result){
	  			if (err) throw err;	
	  			console.log("1 document inserted");
	  			db.close();
	  		})

  		}
  	});
    res.send();
});

app.get('/getAll', (req,res) => {
	console.log('getAll');
	MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			collection.find().toArray(function(err, result) {
	  			if (err) throw err;	
	  			console.log(result);
	  			res.send(result);
	  			db.close();
	  		})
  		}
  	});
});

app.delete('/del', (req,res) => {
	console.log('delete ' + req.query.name);
	let name = req.query.name;
	MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			collection.deleteMany({ name: req.query.name }, function(err, obj) {
	  			if (err) throw err;	
	  			console.log(obj.result.n + " document(s) deleted");
	  			if(obj.result.n == 0)
	  				res.status(404).send();
	  			else
	  				res.send();
	  			db.close();
	  		})
  		}
  	});
});


app.put('/update', (req,res) => {
	console.log('update ' +  req.query.name + ' ' + req.query.surname + ' ' + req.query.phone);
	MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			var newvalues = { $set: { "phone": req.query.phone } };
			collection.updateMany({ "name": req.query.name, "surname":req.query.surname}, newvalues, function(error, result) {
				if (err) throw err;
	  			console.log(result.result.nModified + " document(s) updated");
	  			if(result.result.nModified == 0)
	  				res.status(404).send();
	  			else
	  				res.send();
	  			db.close();
	  		})
  		}
  	});

});

app.get('/getName', (req,res) => {
	console.log('getName ' + req.query.name);
	MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			collection.find({"name" : { $regex: req.query.name,$options:"$i"} }).toArray(function(err, result) {
	  			if (err) throw err;	
	  			console.log('Найдено: ' + result.length);
	  			if(result.length)
	  				res.send(result);
	  			else
	  				res.status(404).send();
	  			db.close();
	  		})
  		}
  	});
});

app.get('/getSurname', (req,res) => {
	console.log('getSurname ' + req.query.surname);
	MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			collection.find({"surname" : { $regex: req.query.surname, $options:"$i"} }).toArray(function(err, result) {
	  			if (err) throw err;	
	  			console.log('Найдено: ' + result.length);
	  			if(result.length)
	  				res.send(result);
	  			else
	  				res.status(404).send();
	  			db.close();
	  		})
  		}
  	});
});

app.get('/getPhone', (req,res) => {
	console.log('getPhone ' + req.query.phone);
	MongoClient.connect(url, function(err, db) {
  		if (err){
  			console.log('Error connection to MongoDB server:',err);	
  		}
  		else{
  			var dbo = db.db('testdb');
  			var collection = dbo.collection("book");
  			collection.find({"phone" : { $regex: req.query.phone,$options:"$i"} }).toArray(function(err, result) {
	  			if (err) throw err;	
	  			console.log('Найдено: ' + result.length);
	  			if(result.length)
	  				res.send(result);
	  			else
	  				res.status(404).send();
	  			db.close();
	  		})
  		}
  	});
});
app.listen(port);
console.log('Server start on port: ', port)