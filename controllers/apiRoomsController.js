var Rooms = require('../models/Room')
module.exports = {
  // https://docs.mongodb.com/v3.0/reference/operator/query/text/
  search: function (req, res) {
    var q = req.query.q
    Rooms.find({ $text: { $search: q } }, function (err, rooms) {
      if (err) {
        return res.status(500).json({
          message: 'Error in search'
        })
      }
      return res.json(rooms)
    })
  },
  list: function (req, res) {
    Rooms.find(function (err, rooms) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting room'
        })
      }
      return res.json(rooms)
    })
  },
  show: function (req, res) {
    var id = req.params.id
    Rooms.findOne({ _id: id }, function (err, room) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting room'
        })
      }
      if (!room) {
        return res.status(404).json({
          message: 'Room not found'
        })
      }
      return res.json(room)
    })
  },
  showhtml: function (req, res) {
    var id = req.params.id
    var response = "";
    var separador = "";
    Rooms.findOne({ number: id }, function (err, room) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting room'
        })
      }
      if (!room) {
        return res.status(404).json({
          message: 'Room not found'
        })
      }
      if (room.player1 != "") {
        response = response + room.player1;
        separador = "<br />";
      }
      if (room.player2 != "") {
        response = response + separador + room.player2;
      }
      if (response != "") {
        response = "Inside:<p> " + response + "</p>";
      }

      return res.send(response);
    })
  },
  create: function (req, res) {
    var room = new Rooms(req.body)
    room.save(function (err, room) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving room',
          error: err
        })
      }
      return res.status(201).json({
        message: 'saved',
        _id: room._id
      })
    })
  },
  ocupationroom: function (req, res) {
    var room2 = req.params.room
    Rooms.findOne({ number: room2 }, function (err, room) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving room',
          error: err
        })
      }
      if (!room) {
        return res.status(404).json({
          message: 'Room not found'
        })
      }
      console.log(room)
      if (room.player1 != "" && room.player2 != "") {
        console.log(room)
        return res.send('<i id="o' + room2 + '" style="" class="fa fa-users fa-2x"></i>')
      }
      else if (room.player1 === "" && room.player2 === "") {
        return res.send('<i id="o' + room2 + '" style="" class="fa fa-user-times fa-2x"></i>');
      }
      else {
        return res.send('<i id="o' + room2 + '" style="" class="fa fa-user fa-2x"></i>');
      }
    })
  },
  userinroom: function (req, res) {
    var room2 = req.params.room
    var player = req.params.player
    console.log(room2);
    console.log(player);
    previous = false;
    Rooms.findOne({ player1: player }, function (err, room) {
      if (room) {
        return res.status(404).json({
          message: 'You are already in Room ' + room.number
        })
      }
      else {
        Rooms.findOne({ player2: player }, function (err, room) {
          if (room) {
            return res.status(404).json({
              message: 'You are already in Room ' + room.number
            })
          }
          else {
            Rooms.findOne({ number: room2 }, function (err, room) {
              if (err) {
                return res.status(500).json({
                  message: 'Error saving player in room',
                  error: err
                })
              }
              if (!room) {
                return res.status(404).json({
                  message: 'Room not found'
                })
              }
              if (room.player1 != "" && room.player2 != "") {
                console.log(room)
                return res.status(500).json({
                  message: 'Room is full',
                  error: err
                })
              }
              else if (room.player1 === "") {
                room.player1 = player;
              }
              else if (room.player2 === "") {
                room.player2 = player;
              }
              console.log(room);
              room.save(function (err, room) {
                console.log(err)
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
                return res.json(room)
              })
            })
          }
        });
      }
    });


  },
  update: function (req, res) {
    var id = req.params.id
    Rooms.findOne({ _id: id }, function (err, room) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving room',
          error: err
        })
      }
      if (!room) {
        return res.status(404).json({
          message: 'Room not found'
        })
      }
      room._id = req.body._id
      room.room = req.body.room
      room.result = req.body.result
      room.winner = req.body.winner
      room.player1 = req.body.player1
      room.player2 = req.body.player2
      room.save(function (err, room) {
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
        return res.json(room)
      })
    })
  },
  remove: function (req, res) {
    var id = req.params.id
    Rooms.findByIdAndRemove(id, function (err, room) {
      if (err) {
        return res.json(500, {
          message: 'Room not found'
        })
      }
      return res.json(room)
    })
  },
  disconectAllRooms: async function(req, res){
    var username = req.body.username;
    try{
      const data = await  Rooms.updateMany({player1: username}, {$set: {player1: ''}})
      const data2 = await Rooms.updateMany({player2: username}, {$set: {player2: ''}})
      if( data.acknowledged && data2.acknowledged){
        return res.json(200, {
          message: 'All rooms left'
      })
      }
    }catch(error){
      console.log(error)
      return res.json(500, {
        message: 'Error leaving the rooms'
      })
    }
  }

}