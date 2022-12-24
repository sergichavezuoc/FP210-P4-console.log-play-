var Rooms = require('../models/Room')

function gameApp(request, response) {
  response.render('game-app', { name: 'game-app.css' });
  response.end();
}

function disconnect(request, response) {
  Rooms.findOne({ number: request.query.room }, function (err, chosen_room) {
    if (chosen_room !== undefined) {
      if (chosen_room.player1 === request.query.user) {
        chosen_room.player1 = '';
        chosen_room.save(function (err, room) {
          if (err) {
            return res.status(500).json({
              message: 'Error saving room'
            })
          }
          if (!room) {
            return res.status(404).json({
              message: 'Room not found'
            })
          }

        })
        response.writeHead(200, { "Content-Type": "text/html" });
      }
      else if (chosen_room.player2 === request.query.user) {
        chosen_room.player2 = '';
        chosen_room.save(function (err, room) {
          if (err) {
            return res.status(500).json({
              message: 'Error saving room'
            })
          }
          if (!room) {
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

exports.gameApp = gameApp;
exports.disconnect = disconnect;