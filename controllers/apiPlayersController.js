var Players = require('../models/Player')
module.exports = {
// https://docs.mongodb.com/v3.0/reference/operator/query/text/
search: function (req, res) {
  var q = req.query.q
  Players.find({ $text: { $search: q } }, function(err, players) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(players)
  })
},
list: function(req, res) {
  Players.find(function(err, players){
    if(err) {
      return res.status(500).json({
        message: 'Error obteniendo la player'
      })
    }
    return res.json(players)
  })
},
show: function(req, res) {
  var id = req.params.id
  Players.findOne({_id: id}, function(err, player){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al obtener la player'
      })
    }
    if(!player) {
      return res.status(404).json( {
        message: 'No tenemos esta player'
      })
    }
    return res.json(player)
  })
},
create: function(req, res) {
  var player = new Players (req.body)
  player.save(function(err, player){
    if(err) {
      return res.status(500).json( {
        message: 'Error al guardar la player',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: player._id
    })
  })
},
update: function(req, res) {
  var id = req.params.id
  Players.findOne({_id: id}, function(err, player){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al guardar la player',
        error: err
      })
    }
    if(!player) {
      return res.status(404).json({
        message: 'No hemos encontrado la player'
      })
    }
    player.Name = req.body.name
    player.Username =  req.body.username
    player.Password = req.body.password
    player.save(function(err, player){
      if(err) {
        return res.status(500).json({
          message: 'Error al guardar la player'
        })
      }
      if(!player) {
        return res.status(404).json({
          message: 'No hemos encontrado la player'
        })
      }
      return res.json(player)
    })
  })
},
remove: function(req, res) {
  var id = req.params.id
  Players.findByIdAndRemove(id, function(err, player){
    if(err) {
      return res.json(500, {
        message: 'No hemos encontrado la player'
      })
    }
    return res.json(player)
  })
}
}