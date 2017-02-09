// ==UserScript==
// @name         RingZer0 Hash me if you can
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ringzer0team.com/challenges/13
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
    
    var hash = sha512(msgText);
    
    window.location.pathname = window.location.pathname + "/"+hash;

    // Your code here...
})();