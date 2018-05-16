var songs = {
    piano:      "ti-ta-ti",
    trumpet:    "pouet",
    flute:      "trulu",
    violin:     "gzi-gzi",
    drum:       "boum-boum"
};

var instrument = process.argv[2];

var dgram = require('dgram');
var uuid = require('uuid').v1();

if(!songs.hasOwnProperty(instrument)){
	console.log("Aucun son correspondant à " + instrument);
    return;
}

setInterval(function(){
	var socket = dgram.createSocket('udp4');
	var message = JSON.stringify({
		uuid: uuid,
		instrument:songs[instrument]
	});
	
	socket.send(message, 0, message.length, 2206, '127.0.0.1', function(error, bytes){
		if(error)
			throw error;
		
		console.log("message envoyée!" + bytes);
		socket.close();
	});
},1000);
