var port = 3000; // Указываем порт на котором у на стоит сокет
var socket = io.connect('http://localhost:' + port);
var name;

socket.on('userName', function(userName){ // Создаем прослушку 'userName' и принимаем переменную name в виде аргумента 'userName'
	console.log('Your username is => ' + userName); // Логгирование в консоль браузера
	$('textarea').val($('textarea').val() + 'Your username is ' + userName + '\n'); // Выводим в поле для текста оповещение для подключенного с его ником
	name = userName;
});

socket.on('newUser', function(userName){ 
	console.log('New user has been connected to chat | ' + userName);
	$('textarea').val($('textarea').val() + userName + ' connected!\n');
});

$(document).on('click', 'button', function(){ 
	var message = $('input').val(); 
	socket.emit('message', name, message); 
	$('input').val(null);
});

socket.on('messageToClients', function(msg, name){
	console.log(name + ' | => ' + msg); // Логгирование в консоль браузера
	$('textarea').val($('textarea').val() + name + ' : '+ msg +'\n'); // Добавляем в поле для текста сообщение типа (Ник : текст)
});