// ==UserScript==
// @name         RingZer0 challenge 32
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ringzer0team.com/challenges/32
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

    var msgText = msg.text().replace("----- BEGIN MESSAGE -----","").replace("----- END MESSAGE -----","").replace(/\s/g,"");
    
    var firstNb = parseInt(msgText.substring(0,msgText.indexOf("+")));
    var secondNb = parseInt(msgText.substring(msgText.indexOf("+")+1,msgText.indexOf("-")),16);
    var thirdNb = parseInt(msgText.substring(msgText.indexOf("-")+1,msgText.indexOf("=")),2);
    
    console.log(firstNb);
    console.log(secondNb);
    console.log(thirdNb);
    
    var result = firstNb + secondNb - thirdNb;
    
    console.log("Result : "+result);

    window.location.pathname = window.location.pathname + "/"+result;
})();