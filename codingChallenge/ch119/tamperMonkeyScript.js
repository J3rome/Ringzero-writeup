// ==UserScript==
// @name         RingZer0 ch119
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ringzer0team.com/challenges/119
// @require http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

y=1;
z=1;

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result;
};

(function() {
    'use strict';
    var msg = $(".message");
    
    if(msg.length > 0){
        msg = $(msg[0]);
    }
    
    var msgText = msg.html().replace("----- BEGIN MESSAGE -----","").replace("----- END MESSAGE -----","").replace(/\s/g,"").split("<br>");
    
    console.log(msgText);
    
    var i =0;
    while(i< msgText.length){
        if(msgText[i] == ""){
            msgText.splice(i,1);
        }else{
            i++;
        }
    }
    
    var buff="";
    var resp = [];
    
    for(var j=0;j < msgText.length;j++){
        if(j%5 == 0 && j != 0){
            resp.push(buff);
            buff = "";
        }
        buff += msgText[j];
    }

    
    y = resp;
    
    //var hash = sha512(msgText);
    
    //window.location.pathname = window.location.pathname + "/"+hash;

    // Your code here...
})();