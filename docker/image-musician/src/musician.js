//Classe, require and configuration
var dgram = require('dgram');
var uuid = require('uuid');
var socket = dgram.createSocket('udp4');

var HOST = '230.1.1.69'; //'127.0.0.1';//'229.1.1.69';
var PORT = 2206;

var sounds = {
    piano:      "ti-ta-ti",
    trumpet:    "pouet",
    flute:      "trulu",
    violin:     "gzi-gzi",
    drum:       "boum-boum"
};

function Musician(uuid, sound) {
    this.uuid = uuid;
    this.sound = sound;
}
var instrument = process.argv[2];
var musician = new Musician(uuid,sounds[instrument]);

//finction send a song all seconds
setInterval(function(){

	var message = JSON.stringify(musician);
	
	socket.send(message, 0, message.length, PORT, HOST, function(error, bytes){
		if(error){
			throw error;
		}
		console.log('Send UDP::' + HOST +'::'+ PORT + '::' + message);
	});
},1000);
