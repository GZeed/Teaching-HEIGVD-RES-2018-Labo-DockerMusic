var instruments  = {
    "ti-ta-ti": "piano",
    "pouet":    "trumpet",
    "trulu":    "flute",
    "gzi-gzi":  "violin",
    "boum-boum":"drum"
};

var HOST = '127.0.0.1'
var UDP_SERVER_PORT = 2206;
var TCP_SERVER_PORT = 2205;

var musiciens = {};

setInterval(function(){
	var nouveauMusicien = {};
	var dateNow = new Date();
	for(var m in musiciens){
		if(musiciens[m].activeSince.getTime() / 1000 > dateNow.getTime()/1000){
			nouveauMusicien[m] = musiciens[m];
		}	
	}
	console.log('les nouveaux musiciens actuelles sont : '  + JSON.stringify(nouveauMusicien));
	musiciens = nouveauMusicien;
},5000)
var util = require('util')
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4');

//UDP Serveur

udpServer.on('listening', function() {
    console.log("UDP server started and listening");
});

udpServer.on('message',function(message){
	var jon = JSON.parse(message);
	
	musiciens[jon.uuid] = {
		activeSince : new Date(),
		uuid : jon.uuid,
		song : instruments[jon.song]
	};
	//console.log(musiciens[jon.uuid].activeSince.getTime().toString());
});

udpServer.bind({port: UDP_SERVER_PORT, address: HOST});

var net = require('net');
//TCP_SERVER
var tcpServer = net.createServer(function(socket){
	

    var response = [];
    for(var m in musiciens)
        response.push(musiciens[m]);
	
    socket.write(JSON.stringify(response));
	console.log(JSON.stringify(response));
    socket.destroy();
});

tcpServer.listen(TCP_SERVER_PORT, HOST);