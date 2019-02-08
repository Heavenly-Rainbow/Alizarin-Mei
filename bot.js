/*
  Alizarin Mei 1.0
  
  By: Heavenly Rainbow
  
*/

//Requerimos los modulos a usar

const TeleBot = require('telebot');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Construimos el objeto bot y lo enlazamos al token

const bot = new TeleBot('713450832:AAFN_Tmb66Ctw8rY9e4ZRfDo3nEmOg9Y6z4');

//Declaramos la api de la DB de las imagenes

const API = 'https://theponyapi.com/api/v1/pony/random';

//Creamos un Keyboard

const replyMarkup = bot.keyboard([
    ['/pony', '/suerte', '/about']
], {resize: true, once: false});

//Creamos un log para los mensajes recividos

bot.on('text', function (msg) {
    console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});

//Creamos la respuesta del comando /start

bot.on(['/start'], function (msg) {

     return bot.sendMessage(msg.chat.id, `Hola ${ msg.from.first_name }, soy Alizarin Mei\nY estoy aqui para divertime. :3`, {replyMarkup}
    );

});

//Creamos la respuesta del comando /suerte

bot.on('/suerte', function (msg) {

    let text_med = `Lo siento ${ msg.from.first_name }, pero esta funcion esta en desarrollo`;

    return bot.sendMessage(msg.chat.id, text_med);

});

// Creamos la respuesta del comando /about

bot.on('/about', function (msg) {

    let text = 'Bot desarrollado por @HeavenlyRainbow utilizando nodejs como servicio de backend y la api de https://theponyapi.com como fuente."';

    return bot.sendMessage(msg.chat.id, text);

});

//Creamos la respuesta del comando /pony"

bot.on(['/pony'], function (msg) {

    let promise;
    let id = msg.chat.id;
    
//Creamos una funcion para obtener el JSON de la api
    
 function Get(Url){
    var Httpreq =  new XMLHttpRequest();
    Httpreq.open("GET",Url,false);
    Httpreq.send(null);       
    return Httpreq.responseText;  
       
}

//Parseamos el JSON y lo llamamos a la funcion get    
    
var obj = JSON.parse(Get(API));
    
//Extraemos la url de la imagen del JSON
	
const DIR = obj.pony.sourceURL

//Imprimimos en pantalla el resultado

console.log("Enviando: " + DIR + "");
    
//Enviamos la imagen obtenida
   
promise = bot.sendPhoto(id, DIR);
    
//Enviamos la señal de "subiendo imagen"
    
bot.sendAction(id, 'upload_photo');

//Creamos un captador de errores
    
return promise.catch(error => {
    console.log('[error]', error);
   
//Enviamos un mensaje de error en caso de que lo alla 
 
bot.sendPhoto(id, 'https://static-asset-delivery.hasbroapps.com/b01c7962c8a8dac027a9ca9a8caf89a70290b6f0/8a031d5323dc0ec21b271f911d23350b.png');
bot.sendMessage(msg.chat.id, "QUE ALGÚN PONY ME AYUDE!, Se a producido un error al tratar de obtener una imagen.");

  });

});

//Iniciamos el bot

bot.start();