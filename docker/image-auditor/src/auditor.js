var dgram = require('dgram');
var net = require('net');
var moment = require('moment');

//Classe, require and configuration
var TCP_HOST ='0.0.0.0'; //'127.0.0.1';//'0.0.0.0'
var UDP_HOST = '230.1.1.69';
var UDP_SERVER_PORT = 2206;
var TCP_SERVER_PORT = 2205;


var udpServer = dgram.createSocket('udp4');

var instruments = {
    'ti-ta-ti': "piano",
    'pouet': "trumpet",
    'trulu': "flute",
    'gzi-gzi': "violin",
    'boum-boum': "drum"
};

function Musician() {
    this.uuid;
    this.instrument;
	this.activeSince;
};

var musiciens = new Map();

//Routine server task and logic
function clearMusician() {
	console.log('clearMusician::Number of musicians: ' + musiciens.size);

	musiciens.forEach(function(value, key) {

	    console.log(key + " " + value);

		 if (moment().diff(value.activeSince, 'seconds') > 5){
			console.log('clearMusician::Supression de ' + value);
			musiciens.delete(value);
		 } else {
		     listMusiciens.push(value);
         }
	});

	console.log(musiciens.size);
}

// UDP Server recieve message from musiciens
udpServer.on('listening', function() {
    console.log("UDP server started and listening");
});

udpServer.on('message', function(message) {
    console.log("UDP::Received: " + message);

    var musicienListened = new Musician();

	var tmp = JSON.parse(message);

    musicienListened.uuid = tmp.uuid;
	musicienListened.instrument = instruments[tmp.sound];
	musicienListened.activeSince = moment(new Date());

	musiciens.set(musicienListened.uuid, musicienListened);
});

udpServer.bind(UDP_SERVER_PORT, function() {
    console.log("UDP::Multicast on: " + UDP_HOST);
    udpServer.addMembership(UDP_HOST);
});

var listMusiciens;

//TCP SERVER 
var tcpServer = net.createServer(function(socket) {

    listMusiciens = [];

    clearMusician();

    var jsonResponse = JSON.stringify(listMusiciens, null, '\t');

	console.log(jsonResponse);

    socket.write(jsonResponse + '\n');

    socket.destroy();
});

tcpServer.listen(TCP_SERVER_PORT, TCP_HOST);