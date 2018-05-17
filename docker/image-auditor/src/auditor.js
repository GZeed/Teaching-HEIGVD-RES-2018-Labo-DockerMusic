//Classe, require and configuration
var HOST = '127.0.0.1';//'0.0.0.0'
var UDP_SERVER_PORT = 2206;
var TCP_SERVER_PORT = 2205;

var util = require('util')
var dgram = require('dgram');
var net = require('net');

var instruments = {
    'ti-ta-ti': "piano",
    'pouet': "trumpet",
    'trulu': "flute",
    'gzi-gzi': "violin",
    'boum-boum': "drum"
};

class Musician {
  constructor(uuid, instrument, sound, activeSince) {
    this.uuid = uuid;
    this.instrument = instrument;
	this.sound = sound;
	this.activeSince = activeSince;
  }
}

var musiciens = new Map();

//Routine server task and logic
setInterval(function(){
	console.log('taille du tableau at traiter' + musiciens.size);
	var dateNow = new Date();
	musiciens.forEach(function(value, key){
		console.log('controle de ' + value.uuid);
		if(value.activeSince.getTime() / 1000  + 5 < dateNow.getTime()/1000){
			console.log('supression de ' + value);
			musiciens.delete(key)
		}
	});

	console.log(musiciens.size);
	
},5000)



//UDP Server recieve message from musiciens
var udpServer = dgram.createSocket('udp4');

udpServer.on('listening', function() {
    console.log("UDP server started and listening");
});

udpServer.on('message',function(message){
	var musicienListened = JSON.parse(message);
	musicienListened.song = instruments[musicienListened.instrument];
	musicienListened.activeSince = new Date(); 
	
	
	musiciens.set(musicienListened.uuid, musicienListened);
	/*console.log(musiciens.get(musicienListened.uuid));*/
	/*musiciens.set(musicienListened.uuid,  new Musician(musicienListened.uuid, musicienListened.instrument, instruments[musicienListened.instrument], new Date().getTime()));
	console.log('Recieved UDP and parsed' + musiciens[musicienListened.uuid].uuid + " "
	+ musiciens[musicienListened.uuid].instrument + " " + musiciens[musicienListened.uuid].sound + " " /*+ musiciens[musicienListened.uuid].activeSince.getTime().toString()*//*);
	console.log('udp taille tablau' + musiciens.size);*/
});

udpServer.bind({port: UDP_SERVER_PORT, address: HOST});

//TCP SERVER respond to client
/*var tcpServer = net.createServer(function(socket){
    var response = [];
    for(var m in musiciens)
        response.push(musiciens[m]);
	
    socket.write(JSON.stringify(response));
    socket.destroy();
});

tcpServer.listen(TCP_SERVER_PORT, HOST);*/