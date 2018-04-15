var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var user1 = {name:'Dima', age:29};
var user2 = {name:'Andrew', age:22};
var user3 = {name:'Anna', age:28};
var user4 = {name:'Ivan', age:33};

MongoClient.connect(url, function(err, db) {
  	if (err){
  		console.log('Error connection to MongoDB server:',err);	
  	}
  	else{
  		console.log('Connection with DB done!');
  		var dbo = db.db('testdb');
  		var collection = dbo.collection("catalog");

	  	collection.insertMany([user1,user2,user3,user4], function(err,result){
	  		if (err) throw err;	
	  		collection.find({}).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    var newvalues = { $set: { name: "Vasilii" } };
			  	collection.updateMany({ name: "Dima" }, newvalues, function(err, result) {
				    if (err) throw err;
				    collection.find({ name: "Vasilii" }).toArray(function(err, result) {
				    	console.log('Value were changed:', result);
				    	collection.deleteMany({ name: "Vasilii" }, function(err, obj) {
						    if (err) throw err;
						    console.log(obj.result.n + " document(s) deleted");
						    db.close();
						});
				    });
				});
			});
	  	});
  	}
});