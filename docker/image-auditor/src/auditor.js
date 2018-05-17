//Classe, require and configuration
var dgram = require('dgram');
var net = require('net');
var moment = require('moment');

var TCP_HOST ='0.0.0.0'; //'127.0.0.1';//'0.0.0.0'
var UDP_HOST = '229.1.1.69';

var UDP_SERVER_PORT = 4000;
var TCP_SERVER_PORT = 2205;


var udpServer = dgram.createSocket('udp4');

var instruments = {
    'ti-ta-ti': "piano",
    'pouet': "trumpet",
    'trulu': "flute",
    'gzi-gzi': "violin",
    'boum-boum': "drum"
};

function Musician(activeSince) {
    this.uuid;
    this.instrument;
    this.activeSince = activeSince;
};

var musiciens = new Map();

//Routine server task and logic
function clearMusiciens(){
	console.log('clearMusiciens::nuber of musiciens zize::' + musiciens.size);
	var dateNow = moment(new Date());
	musiciens.forEach(function(value, key){
		if(moment().diff(value.activeSince,'seconds') >= 5){
			console.log('clearMusiciens::supression of::' + value);
			musiciens.delete(key);
		}
	});
	console.log(musiciens.size);
	
}



//UDP Server recieve message from musiciens


udpServer.on('listening', function() {
    console.log("UDP server started and listening");
});


udpServer.on('message', function(message) {
    console.log("UDP::Received: " + message);
    var musicienListened = new Musician(moment(new Date()));
    var tmp = JSON.parse(message);
    musicienListened.uuid = tmp.uuid;
    musicienListened.instrument = instruments[tmp.sound];
	console.log('UDP::recived::musiciens set musicienListened::' +  JSON.stringify(musicienListened));
    musiciens.set(musicienListened.uuid, musicienListened);
});

udpServer.bind(UDP_SERVER_PORT,  UDP_HOST, function() {
    console.log("UDP::multicast on::" + UDP_HOST);
    udpServer.addMembership(UDP_HOST);
});

//TCP SERVER 
var tcpServer = net.createServer(function(socket){	
	clearMusiciens();
    console.log('TCP_SERVER::musiciens size::' + musiciens.size,'\t');
	console.log('TCP_SERVER::Respons::' + JSON.stringify(musiciens),'\t');
	socket.write(JSON.stringify(musiciens));
    socket.destroy();
});

tcpServer.listen(TCP_SERVER_PORT, TCP_HOST);