
const http     = require('http');
const https    = require('https');
const fs	   = require('fs');
const joinPath = require('path.join');
const querystring = require('query-string');
const conf 	   = {encoding:'utf8'};

const url  		= 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df';
const port		= 3000;

var rusText = 'Привет всем!!!';
var enText;

const postData = querystring.stringify({
  'text': rusText,
  'lang': 'ru-en'
});

console.log(url+ '&' + postData);

const options = {
  hostname: url+ '&' + postData,
  port: 80,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

//const request = https.request(url+ '&' + postData);
//request.on('response', handler1);
//request.end();
function handler1(response) {
	let data = '';
	response.on('data', function (chunk) {
		data += chunk;
	});
	response.on('end', function () {
		enText = JSON.parse(data).text[0];
		console.log(enText);
	});
}



const server = http.createServer(function (req, res) {
	fs.readFile('./index.html', conf, function (err, html){
	    if (err) {
	        throw err; 
	    } 
	    else{
			res.writeHeader(200, {"Content-Type": "text/html"}); 
			res.write(html); 
			res.end(); //end the response
	    }
	});

});
server.on('error', err => console.error(err));
server.on('request', handler2);
server.on('listening', () => {
	console.log('Start HTTP server on port %d', port);
});
server.listen(port); //the server object listens on port 8080

function handler2(req, res) {
	console.log(req.url);

	//let name = req.url.replace('/', '') || 'World';
	//res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
	//res.write(`Hello ${name}!`);
	//res.end();
}

