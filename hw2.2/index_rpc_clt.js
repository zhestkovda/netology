var rpc = require('json-rpc2');
 
var client = rpc.Client.$create(3000, 'localhost');
 
var var1 = {name: 'Dima', score:1234};
var var2 = {name: 'Ivan', score:14};
var var3 = {name: 'Max', score:1};
var var4 = {name: 'All'};
var var5 = {name: 'Max'};
var var6 = {name: 'Max123'};
var var7 = {name: 'Dima', score:1010101010};

client.call('post', var1, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('post', var2, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('post', var3, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('get', var4, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('get', var5, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('get', var6, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('delete', var5, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});

client.call('put', var7, function(err, result) {
    if(err){
    	console.log(err);
    } else{
    	console.log(result);
    }
});