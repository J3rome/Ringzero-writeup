// ==UserScript==
// @name         RingZer0 Hash me if you can RELOADED
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ringzer0team.com/challenges/14
// @require http://code.jquery.com/jquery-latest.js
// @require https://raw.githubusercontent.com/emn178/js-sha512/master/src/sha512.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var msg = $(".message");

    if(msg.length > 0){
        msg = $(msg[0]);
    }

    var msgTextBin = msg.text().replace("----- BEGIN MESSAGE -----","").replace("----- END MESSAGE -----","").replace(/\s/g,"");

    // We use slice -1 to remove the space that we added after the last group of 8 bits
    msgTextBin = msgTextBin.replace(/(.{8})/g,"$1 ").slice(0,-1).split(" ");


    var msgTextStringArray = [];

    for(var i=0;i< msgTextBin.length;i++){
        msgTextStringArray.push(String.fromCharCode(parseInt(msgTextBin[i],2)));
    }

    var msgTextString = msgTextStringArray.join("");

    var hash = sha512(msgTextString);

    window.location.pathname = window.location.pathname + "/"+hash;

    // Your code here...
})();