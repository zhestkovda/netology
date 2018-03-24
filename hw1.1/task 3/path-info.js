const fs = require('fs');
const conf = {encoding: 'utf8'};

const pathInfo = (path,callback) =>  {
	var info;
	var error;
	var type;
	var cont;
	var childs = [];
	fs.stat(path, (err,stats) => {
		if(err){
			error = err;	
		} 
		if(stats.isFile()){
			type = "file";
			fs.readFile(path,conf, (err,content) => {
				if(err) { 
					error = err; return;
				} 
				cont = content;
				info = {"path": path, "type":type, "content":cont, "childs":childs};
				callback(error,info);
			});
		}
		if(stats.isDirectory()){
			type = "directory";
			fs.readdir(path, (err,files) => {
				if(err) {
					error = err; return;
				}
				childs = files;
				info = {"path": path, "type":type, "content":cont, "childs":childs};
				callback(error,info);
			})	
		}
	})	
}

module.exports = pathInfo;
