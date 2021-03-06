const fs = require('fs');
conf = {encoding:'utf8'};
var temp;
function readDir(path){
	return new Promise((done,fail) => {
		fs.readdir(path,(err,files) => {
			if(err){
				fail(err);
			}
			else{
				done(files); 
			}	
		});
	});	
}

function readFile(file){
	return new Promise((done,fail) => {
		fs.readFile(file, conf,(err,content) => {
			if(err){ 
				fail(err);
			}
			else{
				done(content);
			}
		});
	})
}

const readAll = path => {
	return readDir(path)
		.then (files => Promise.all(
			files.map( file => {
				return readFile(path+file)
					.then(content => {
						return {file, content}
					})
					.catch(err => {
						console.log(err);
					})
			})
		))
		.then(items => {
			return items.map(item=>{
		      	return item ? {name: item.file, content: item.content} : null
		    })	
		})
}

module.exports = readAll;
