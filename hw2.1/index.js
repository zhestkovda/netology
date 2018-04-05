
const http     = require('http');
const https    = require('https');
const fs	   = require('fs');
const joinPath = require('path.join');
const querystring = require('query-string');
const urlpack   = require('url');
const conf 	   = {encoding:'utf8'};

const url  		= 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df';
const port		= 3000;

//console.log(url+ '&' + postData);

function translate(rusText){
	return  new Promise((done,fail) => {
		const postData = querystring.stringify({
		  'text': rusText,
		  'lang': 'ru-en'
		});
		const request = https.request(url + '&' + postData);
		request.on('response', (response) => {
			let data = '';
			response.on('data', function (chunk) {
				data += chunk;
			});
			response.on('end', function () {
				console.log(data);
				done(JSON.parse(data).text[0]);
			});
		});
		request.on('error', (e) => {
			fail(e);
		})
		request.end();
	})
}

function sendTranslation(res, data){
	return new Promise ((done, fail) => {
		try{
			res.writeHeader(200, {'Content-Type': 'text/javascript'}); 
			res.write(data);
		    res.end();
		    done('Перевод был успешно отправлен')
		}
		catch(ex)
		{
			fail(ex);
		}
	})
}

const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler2);
server.on('listening', () => {
	console.log('Start HTTP server on port %d', port);
});
server.listen(port); //the server object listens on port 8080

function handler2(req, res) {
	var q = urlpack.parse(req.url, true);
	var qdata = q.query;
	if(Object.keys(qdata).length){   // если есть строка для перевода	
		translate(qdata.content)
		.then(data => sendTranslation(res, data))
		.catch(error => console.error(error))
	}
	else{
		fs.readFile('./index.html', conf, function (err, html){
		    if (err) {
		        throw err; 
		    } 
		    else{
				res.writeHeader(200, {"Content-Type": "text/html"}); 
				res.write(html); 
		    }
		});
	}
}
