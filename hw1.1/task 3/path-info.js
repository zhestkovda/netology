const fs = require('fs');
const conf = {encoding: 'utf8'};

const pathInfo = (path,callback) =>  {
	let info;
	let error;
	let type;
	let cont;
	fs.stat(path, (err,stats) => {
		if(err){
			callback(err);
			return;	
		} 
		if(stats.isFile()){
			let childs;
			type = "file";
			fs.readFile(path,conf, (err,content) => {
				if(err) { 
					callback(err);
					return;	
				} 
				cont = content;
				info = {"path": path, "type":type, "content":cont, "childs":childs};
				callback(error,info);
			});
		}
		if(stats.isDirectory()){
			let childs = [];
			type = "directory";
			fs.readdir(path, (err,files) => {
				if(err) {
					callback(err);
					return;	
				}
				childs = files;
				info = {"path": path, "type":type, "content":cont, "childs":childs};
				callback(error,info);
			})	
		}
	})	
}

module.exports = pathInfo;
