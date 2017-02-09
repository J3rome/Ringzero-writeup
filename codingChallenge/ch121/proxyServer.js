var http = require("http");
var https = require("https");
var pem = require('pem');
var fs = require('fs');
require('shelljs/global');

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
                        var param = req.url.substring(1).replace(/\/x/g,"");

                        console.log("PArams ("+param.length+") : ");
                        console.log(param);

                        exec("python runshell.py \""+param+"\" 0>output.log",function(status,output){
                                console.log("Exit status : "+status);
                                console.log("Output : "+output);
                                fs.readFile("/root/output.log","utf8",function(err,data){
                                        if(err){
                                                console.log("error Occured");
                                                console.log(err);
                                        }else{
                                                console.log("Reading from file :");
                                                console.log(data);
                                                res.end(data);
                                        }
                                });
                        });

                }
        }

        // ...
        }).listen(443);

})
