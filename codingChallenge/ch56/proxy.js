var http = require("http");
var https = require("https");
var pem = require('pem');

var server;

pem.createCertificate({days:1,selfSigned:true},function(err,keys){

	server = https.createServer({key: keys.serviceKey, cert: keys.certificate}, function(req,res){
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}else{
		if(req.url != "/favicon.ico"){
			var hash = req.url.substring(1);
			var request = https.request("https://hashes.org/api.php?act=REQUEST&key=uX7nY7m2bLWRFgD6Jy1kutFdV2m4q5&hash="+hash, function(response){

				var data = '';

				response.on('data', function(chunk){
					data += chunk;
				});

				response.on('end', function(){
					console.log("Got a response");
					var json = JSON.parse(data);
					if(json['REQUEST'] == "FOUND"){
						var decoded = json[hash]['plain'];
						console.log("Hash : "+hash+"  =  "+decoded);
						res.end(decoded);
					}else{
						res.end("NOT FOUND");
					}
					console.log(data);
				});

				
			}).end();
		}
	}

	// ...
	}).listen(443);

})
