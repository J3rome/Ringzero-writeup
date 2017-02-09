// ==UserScript==
// @name         RingZer0 challenge 121
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ringzer0team.com/challenges/121
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

    var msgText = msg.text().replace("----- BEGIN SHELLCODE -----","").replace("----- END SHELLCODE -----","").replace(/\s/g,"");
    
    $.get("https://45.55.203.188/"+msgText,function(data){
        console.log("Received Response");
        console.log(data);
        window.location.pathname = window.location.pathname + "/"+data;
    });
    
    console.log(msgText);

    
})();