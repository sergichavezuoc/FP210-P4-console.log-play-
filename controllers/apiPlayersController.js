var Players = require('../models/Player')
module.exports = {
// https://docs.mongodb.com/v3.0/reference/operator/query/text/
search: function (req, res) {
  var q = req.query.q
  Players.find({ $text: { $search: q } }, function(err, players) {
    if(err) {
      return res.status(500).json({
        message: 'Error in search'
      })
    }
    return res.json(players)
  })
},
list: function(req, res) {
  Players.find(function(err, players){
    if(err) {
      return res.status(500).json({
        message: 'Error getting player'
      })
    }
    return res.json(players)
  })
},
show: function(req, res) {
  var id = req.params.id
  Players.findOne({username: id}, function(err, player){
    if(err) {
      return res.status(500).json({
        message: 'Error getting player'
      })
    }
    if(!player) {
      return res.status(404).json( {
        message: 'Player not found'
      })
    }
    return res.json(player)
  })
},
login: function(req, res) {
  var player = new Players (req.body)
  Players.findOne({username: player.username, password: player.password}, function(err, player){
    if(err) {
      return res.status(500).json({
        message: 'Error getting player'
      })
    }
    if(!player) {
      return res.status(404).json( {
        message: 'Player not found'
      })
    }
    return res.json(player)
  })
},
create: function(req, res) {
  var playerSearched = new Players (req.body)
  //console.log("antes findOne")
  //console.log(playerSearched);
  Players.findOne({username: playerSearched.username}, function(err, player){
    //console.log("dentro findOne")
    //console.log(playerSearched);
    //console.log(player);
    if(err) {
      return res.status(500).json({
        message: 'Error getting player'
      })
    }
    if(!player) {
      if(playerSearched.name == "" || playerSearched.username == "" || playerSearched.password == ""){
        return res.status(500).json({
          message: 'Fields cannot be empty!'
        })
      }

              //console.log("antes save");
      playerSearched.save(function(err, playerSearched){
        if(err) {
          //console.log("error save");
          return res.status(500).json( {
            message: 'Error saving player',
            error: err
          })
        }
       // console.log("saved");
        return res.status(201).json({
          message: 'saved',
          _id: playerSearched._id
        })
      })
      



    }
    if(player){
     // console.log("error player already exist");
      return res.status(500).json({
        message: 'Player already exists!'
      })
    }

  })


},
update: function(req, res) {
  var id = req.params.id
  Players.findOne({username: id}, function(err, player){
    if(err) {
      return res.status(500).json({
        message: 'Error saving player',
        error: err
      })
    }
    if(!player) {
      return res.status(404).json({
        message: 'Player not found'
      })
    }
    player.name = req.body.name
    player.username =  req.body.username
    player.password = req.body.password
    player.save(function(err, player){
      if(err) {
        return res.status(500).json({
          message: 'Error saving player'
        })
      }
      if(!player) {
        return res.status(404).json({
          message: 'Player not found'
        })
      }
      return res.json(player)
    })
  })
},
remove: function(req, res) {
  var id = req.params.id
  Players.findOne({username: id}, function(err, player){
    if(err) {
      return res.status(500).json({
        message: 'Error saving player',
        error: err
      })
    }
    if(!player) {
      return res.status(404).json({
        message: 'Player not found'
      })
    }
    Players.findByIdAndRemove(player.id, function(err, player){
      if(err) {
        return res.json(500, {
          message: 'Player nof found'
        })
      }
      const jugadores = require('../models/UserRegisters').users;
      const index = jugadores.indexOf(5);
      if (jugadores > -1) { 
        jugadores.splice(index, 1); // 2nd parameter means remove one item only
      }
      return res.json(player)
    })
  })

}
}