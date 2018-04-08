/*
Создать приложение на Express.js которое будет иметь 5 вариаций роутов:

GET / – Главная страница которая вернет код 200 OK и покажет текст "Hello, Express.js"
GET /hello – Страница, код ответа 200 OK и покажет текст "Hello stranger!"
GET /hello/[любое имя] – Страница, код ответа 200 OK и покажет текст "Hello, [любое имя]!"
ANY /sub/[что угодно]/[возможно даже так] – Любая из этих страниц должна показать текст "You requested URI: [полный URI запроса]"
POST /post – Страница которая вернет все тело POST запроса (POST body) в JSON формате, либо 404 Not Found - если нет тела запроса

*/
const express = require("express");
const bodyparser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyparser.json());

let users = [];
let name;
let score;

app.get('/', (req,res) => {
	res.status(200).send('Hello, Express.js');
});

app.get('/hello', (req,res) => {
	res.status(200).send('Hello stranger!');
});

app.get('/hello/:name', (req,res) => {
	res.status(200).send('Hello ' + req.params.name);
});

app.all('/sub/*/*', (req,res) => {
	res.status(200).send('You requested URI: ' + req.originalUrl);
});

app.post('/post', (req,res) => {
	console.log(req.body);
	if(req.body){ 
		console.log(req.body);
  		res.json(req.body);
  	}
  	else{
  		res.status(404);
  	}
});


app.listen(port);
console.log('Server start on port: ', port)