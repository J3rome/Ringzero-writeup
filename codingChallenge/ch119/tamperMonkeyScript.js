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

var numberMap = [
    ["&nbsp;xxx&nbsp;", "x&nbsp;&nbsp;&nbsp;x", "x&nbsp;&nbsp;&nbsp;x", "x&nbsp;&nbsp;&nbsp;x", "&nbsp;xxx&nbsp;"],//0
    ["&nbsp;xx&nbsp;&nbsp;", "x&nbsp;x&nbsp;&nbsp;", "&nbsp;&nbsp;x&nbsp;&nbsp;", "&nbsp;&nbsp;x&nbsp;&nbsp;", "xxxxx"], // 1
    ["&nbsp;xxx&nbsp;", "x&nbsp;&nbsp;&nbsp;x&nbsp;", "&nbsp;&nbsp;xx&nbsp;", "&nbsp;x&nbsp;&nbsp;&nbsp;", "xxxxx"],//2
    ["&nbsp;xxx&nbsp;", "x&nbsp;&nbsp;&nbsp;x", "&nbsp;&nbsp;xx&nbsp;", "x&nbsp;&nbsp;&nbsp;x", "&nbsp;xxx&nbsp;"],//3
    ["&nbsp;x&nbsp;&nbsp;&nbsp;x", "x&nbsp;&nbsp;&nbsp;&nbsp;x", "&nbsp;xxxxx", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x", "&nbsp;&nbsp;&nbsp;&nbsp;x"],// 4
    ["xxxxx", "x&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;xxxx", "&nbsp;&nbsp;&nbsp;&nbsp;x", "xxxxx"],// 5
    [],// 6 : Did not find a serie with this number
    [],// 7 : Did not find a serie with this number
    [],// 8 : Did not find a serie with this number
    [] // 9 : Did not find a serie with this number
];

(function() {
    'use strict';
    var msg = $(".message");
    
    if(msg.length > 0){
        msg = $(msg[0]);
    }
    
    var msgText = msg.html().replace("----- BEGIN MESSAGE -----","").replace("----- END MESSAGE -----","").replace(/\s/g,"").split("<br>");
    
    var i =0;
    while(i< msgText.length){
        if(msgText[i] == ""){
            msgText.splice(i,1);
        }else{
            i++;
        }
    }
    
    var buff=[];
    var respAscii = [];
    
    for(var j=0;j < msgText.length;j++){
        if(j%5 == 0 && j != 0){
            respAscii.push(buff);
            buff = [];
        }
        buff.push(msgText[j]);
    }
    
    respAscii.push(buff);
    
    var ans = [];

    for(var j=0;j < respAscii.length;j++){
        for(var k =0;k<numberMap.length;k++){
            if(JSON.stringify(respAscii[j]) == JSON.stringify(numberMap[k])){
                ans.push(k);
            }
        }
    }
    
    if(ans.length != respAscii.length){
        console.log("Some Nb were not detected !");   
    }
    
    window.location.pathname = window.location.pathname + "/"+ans.join("");
})();