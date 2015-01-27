'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');


var socketId;

var PORT = 33333;
//var HOST = '127.0.0.1';
var HOST = '10.0.1.15';

// Handle the "onReceive" event.
var onReceive = function(info) {
  if (info.socketId !== socketId)
    return;
  console.log(info.data);
};

// Create the Socket
chrome.sockets.udp.create({}, function(socketInfo) {
  socketId = socketInfo.socketId;
  // Setup event handler and bind socket.
  chrome.sockets.udp.onReceive.addListener(onReceive);
  chrome.sockets.udp.bind(socketId,
    "0.0.0.0", PORT, function(result) {
      if (result < 0) {
        console.log("Error binding socket.");
        return;
      }
      // chrome.sockets.udp.send(socketId, arrayBuffer,
      //   '127.0.0.1', 1337, function(sendInfo) {
      //     console.log("sent " + sendInfo.bytesSent);
      // });
  });
});