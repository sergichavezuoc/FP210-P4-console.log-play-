var Rooms = require('../models/Room')
module.exports = {
// https://docs.mongodb.com/v3.0/reference/operator/query/text/
search: function (req, res) {
  var q = req.query.q
  Rooms.find({ $text: { $search: q } }, function(err, rooms) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(rooms)
  })
},
list: function(req, res) {
  Rooms.find(function(err, rooms){
    if(err) {
      return res.status(500).json({
        message: 'Error obteniendo la room'
      })
    }
    return res.json(rooms)
  })
},
show: function(req, res) {
  var id = req.params.id
  Rooms.findOne({_id: id}, function(err, room){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al obtener la room'
      })
    }
    if(!room) {
      return res.status(404).json( {
        message: 'No tenemos esta room'
      })
    }
    return res.json(room)
  })
},
create: function(req, res) {
  var room = new Rooms (req.body)
  room.save(function(err, room){
    if(err) {
      return res.status(500).json( {
        message: 'Error al guardar la room',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: room._id
    })
  })
},
update: function(req, res) {
  var id = req.params.id
  Rooms.findOne({_id: id}, function(err, room){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al guardar la room',
        error: err
      })
    }
    if(!room) {
      return res.status(404).json({
        message: 'No hemos encontrado la room'
      })
    }
    room.Number = req.body.number
    room.Room =  req.body.room
    room.Result = req.body.result
    room.Winner = req.body.winner
    room.Player1 = req.body.player1
    room.Player2 = req.body.player2
    room.save(function(err, room){
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
      return res.json(room)
    })
  })
},
remove: function(req, res) {
  var id = req.params.id
  Rooms.findByIdAndRemove(id, function(err, room){
    if(err) {
      return res.json(500, {
        message: 'No hemos encontrado la room'
      })
    }
    return res.json(room)
  })
}
}