var Games = require('../models/Game')
module.exports = {
// https://docs.mongodb.com/v3.0/reference/operator/query/text/
search: function (req, res) {
  var q = req.query.q
  Games.find({ $text: { $search: q } }, function(err, games) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(games)
  })
},
list: function(req, res) {
  Games.find(function(err, games){
    if(err) {
      return res.status(500).json({
        message: 'Error obteniendo la game'
      })
    }
    return res.json(games)
  })
},
show: function(req, res) {
  var id = req.params.id
  Games.findOne({_id: id}, function(err, game){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al obtener la game'
      })
    }
    if(!game) {
      return res.status(404).json( {
        message: 'No tenemos esta game'
      })
    }
    return res.json(game)
  })
},
create: function(req, res) {
  var game = new Games (req.body)
  game.save(function(err, game){
    if(err) {
      return res.status(500).json( {
        message: 'Error al guardar la game',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: game._id
    })
  })
},
update: function(req, res) {
  var id = req.params.id
  Games.findOne({_id: id}, function(err, game){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al guardar la game',
        error: err
      })
    }
    if(!game) {
      return res.status(404).json({
        message: 'No hemos encontrado la game'
      })
    }
    game.number = req.body.number
    game.room =  req.body.room
    game.result = req.body.result
    game.winner = req.body.winner
    game.player1 = req.body.player1
    game.player2 = req.body.player2
    game.save(function(err, game){
      if(err) {
        return res.status(500).json({
          message: 'Error al guardar la game'
        })
      }
      if(!game) {
        return res.status(404).json({
          message: 'No hemos encontrado la game'
        })
      }
      return res.json(game)
    })
  })
},
remove: function(req, res) {
  var id = req.params.id
  Games.findByIdAndRemove(id, function(err, game){
    if(err) {
      return res.json(500, {
        message: 'No hemos encontrado la game'
      })
    }
    return res.json(game)
  })
}
}