const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();	// вызов конструктора родительского класса EventEmitter
    this.title = title;
    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }

  close() {
  	this.emit('close',this);
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (newmessage) => {
  console.log(newmessage);
};

let readyMessage =  () => {
  console.log('Готовлюсь к ответу');
};

let vkclose =  (lst) => {	
  //vkChat.removeListener('message');	
  lst.removeListener('message', chatOnMessage);
  console.log('Чат вконтакте закрылся :(');
};

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', readyMessage);

facebookChat.on('message', chatOnMessage);


vkChat.on('message', chatOnMessage);
vkChat.on('message', readyMessage);
vkChat.once('close', vkclose);

vkChat.setMaxListeners(2);
vkChat.close();

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );