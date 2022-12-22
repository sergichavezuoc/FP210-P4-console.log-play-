var express = require('express');
const url = require('url');
const Game = require("../models/Game");
var router = express.Router();
var { rooms } = require('../models/RoomData');
const {insertGame} = require("../js/db");
const { Server } = require('ws');
var Rooms = require('../models/Room')
// Socket server
const sockserver = new Server({ port: 443 });
const clients = new Map();
const games = new Array();
var players = { "room1": 0, "room2": 0, "room3": 0 };
var colors = { "room1": "", "room2": "", "room3": "" };

sockserver.on('connection', (ws, req) => {
  joine(ws, req);

  ws.on('message', (messageAsString) => {
    //si es de tipo result guardar en ws.game setresult y setganador
    const message = JSON.parse(messageAsString);
 
    if (message.type === 'movement') {
      const metadata = clients.get(ws);
      message.sender = metadata.id;
      message.color = metadata.color;
      const outbound = JSON.stringify(message);
      [...clients.keys()].forEach((client) => {
        if (client.room == message.room) {
          client.send(outbound);
        }
      });
    }
    if(message.type === 'result'){
      ws.game.result=message.result;
      ws.game.winner=message.winner
      insertGame(ws.game)
      Rooms.findOne({number: ws.room}, function(err, roomToDelete){
        
        roomToDelete.player1="";
        roomToDelete.player2="";
        roomToDelete.save(function(err, roomToDelete){
          console.log(err)
          if(err) {
            return res.status(500).json({
              message: 'Error al guardar la room'
            })
          }
          if(!roomToDelete) {
            return res.status(404).json({
              message: 'No hemos encontrado la room'
            })
          }
          
        }) 
        players[ws.room] = 0;
        colors[ws.room] = "";
        clients.delete(ws);
       
      })
    }

  });

  ws.on('close', () => {
    [...clients.keys()].forEach((client) => {
      if (client.room === ws.room && client!=ws) {       
        // guardar en ws.game setresult y setganador
        if (ws.game.result===null && client.game.result===null){
          const data = JSON.stringify({ type: 'close', message: 'Opponent left the game. You won!' });
          client.game.result="25";
          client.game.winner=client.player;
          insertGame(client.game)
          client.send(data);
        }
        
      }
    })
    Rooms.findOne({number: ws.room}, function(err, roomToDelete){
    roomToDelete.player1="";
    roomToDelete.player2="";
    roomToDelete.save(function(err, room){
      console.log(err)
      if(err) {
        return res.status(500).json({
          message: 'Error al guardar la room'
        })
      }
      if(!room) {
        return res.status(404).json({
          message: 'No hemos encontrado la room'
        })
      }
      
    }) 
    players[ws.room] = 0;
    colors[ws.room] = "";
    clients.delete(ws);
    })
  });

});

function joine(ws, req) {
  let parameters = url.parse(req.url, true).query;
  const room = parameters.room;
  if (players[room] === 1) {
    players[room] = players[room] + 1;
    const id = uuidv4();
    const username = parameters.username;
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color, room, username };
    ws.room = parameters.room;
    ws.player = username;
    clients.set(ws, metadata);
    sockserver.clients.forEach((client) => {
      if (client === ws) {
        const data = JSON.stringify({ 'type': 'message', 'message': 'Start the game', 'yourcolor': metadata.color, 'opponentcolor': colors[room], 'player': 'second', 'room': metadata.room, 'username': metadata.username });
        client.send(data);
      }
      else {
        if (client.room === ws.room) {
          ws.game = client.game;
          client.game.player2=username;
          const data = JSON.stringify({ 'type': 'message', 'message': 'Start the game', 'opponentcolor': metadata.color });
          client.send(data);
        }
      }

    });
  } else if (players[room] === 0) {
    let game = new Game({number:uuidv4(), room:room, result:"", winner:"", player1: parameters.username, player2:""});
    games.push(game);
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const username = parameters.username;
    const metadata = { id, color, room, username };
    players[room] = players[room] + 1;
    colors[room] = color;
    ws.room = parameters.room;
    ws.game = game;
    ws.player = username;
    clients.set(ws, metadata);
    unmatched = room;
    const data = JSON.stringify({ 'type': 'message', 'message': 'Wait for an opponent', 'yourcolor': metadata.color, 'player': 'first', 'room': metadata.room, 'username': metadata.username });
    ws.send(data);
  }
  else {
    console.log("Error");
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

setInterval(() => {
  sockserver.clients.forEach((client) => {
    const data = JSON.stringify({ 'type': 'time', 'time': new Date().toTimeString() });
  });
}, 1000);


module.exports = router;