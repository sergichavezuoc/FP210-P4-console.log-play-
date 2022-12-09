var Rooms = require('../models/Room')

function gameApp(request, response) {
  response.render('game-app', { name: 'game-app.css' });
  response.end();
}

function disconnect(request, response) {
  Rooms.findOne({number: request.query.room}, function(err, chosen_room){
  if (chosen_room !== undefined) {
    if (chosen_room.player1 === request.query.user) {
      chosen_room.player1 = '';
      chosen_room.save(function(err, room){
        console.log(err)
        if(err) {
          return res.status(500).json({
            message: 'Error saving room'
          })
        }
        if(!room) {
          return res.status(404).json({
            message: 'Room not found'
          })
        }
        
      })     
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player2 === request.query.user) {
      chosen_room.player2 = '';
      chosen_room.save(function(err, room){
        console.log(err)
        if(err) {
          return res.status(500).json({
            message: 'Error saving room'
          })
        }
        if(!room) {
          return res.status(404).json({
            message: 'Room not found'
          })
        }
        
      }) 
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      response.writeHead(404, { "Content-Type": "text/html" });
    }

  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
  });
}

function ocupationcheck(request, response) {
  Rooms.findOne({room: request.query.room}, function(err, room){
  var chosen_room = rooms.find(room => room.number === request.query.room);
  if (chosen_room != undefined) {
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      return response.send('<i id="o'+request.query.room+'" style="" class="fa fa-users fa-2x"></i>');
    }
    else if (chosen_room.player1 == '' && chosen_room.player2 == '') {
      return response.send('<i id="o'+request.query.room+'" style="" class="fa fa-user-times fa-2x"></i>');
    }
    else {
      return response.send('<i id="o'+request.query.room+'" style="" class="fa fa-user fa-2x"></i>');
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }

  response.end();
  })
}
function ocupation(request, response) {
  var chosen_room = rooms.find(room => room.number === request.query.room);
  var user_in_room = rooms.find(room => room.player1 === request.query.user);
  var user2_in_room = rooms.find(room => room.player2 === request.query.user);
  if (chosen_room != undefined) {
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(404, { "Content-Type": "text/html" });
    }
    else {
      if (chosen_room.player1 === '') {
        chosen_room.player1 = request.query.user
      } else {
        chosen_room.player2 = request.query.user
      }
      response.writeHead(200, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

exports.gameApp = gameApp;
exports.ocupation = ocupation;
exports.ocupationcheck = ocupationcheck;
exports.disconnect = disconnect;