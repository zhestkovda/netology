const fs = require('fs');
conf = {encoding:'utf8'};
var temp;

function readDir(path){
	return new Promise((done,fail) => {
		fs.readdir(path,(err,files) => {
			if(err)
			{fail(err);}
			else
			{
				done(files); 
				console.log(files);
			}	
		});
	});	
}

function readFile(file){
	return new Promise((done,fail) => {
		fs.readFile(file, conf,(err,content) => {
						if(err) 
							fail(err);
						else
							done(content);
		});
	})

}

const readAll = path => {
	console.log(path);
	readDir(path)
		.then (files => Promise.all(

		files.map( file => {
			return readFile(path+file)
				.then(content => {
					return {file, contet}
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
	.then(items=>console.log(items))
 	.catch(err => console.error(err))
}
				
				
			
			

		


module.exports = readAll;