//Classe, require and configuration
var dgram = require('dgram');
var uuid = require('uuid').v1();

var sounds = {
    piano:      "ti-ta-ti",
    trumpet:    "pouet",
    flute:      "trulu",
    violin:     "gzi-gzi",
    drum:       "boum-boum"
};

class Musician {
  constructor(uuid, instrument, sound) {
    this.uuid = uuid;
    this.instrument = instrument;
	this.sound = sound;
  }
}
  console.log('sdf');

var HOST = '229.1.1.69';
var PORT = 2206;
var instrument = process.argv[2];
var musician = new Musician(uuid,instrument , sounds[instrument]);

//finction send a song all seconds
setInterval(function(){
	
	var socket = dgram.createSocket('udp4');
	var message = JSON.stringify({
		uuid: musician.uuid,
		instrument:musician.sound
	});
	
	socket.send(message, 0, message.length, PORT, HOST, function(error, bytes){
		if(error){
			throw error;
		}
		console.log('Send UDP @ ' + HOST +':'+ PORT + ' : ' + message);
		socket.close();
	});
},1000);
