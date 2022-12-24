var Games = require('../models/Game')
module.exports = {
  // https://docs.mongodb.com/v3.0/reference/operator/query/text/
  search: function (req, res) {
    var q = req.query.q
    Games.find({ $text: { $search: q } }, function (err, games) {
      if (err) {
        return res.status(500).json({
          message: 'Error in search'
        })
      }
      return res.json(games)
    })
  },
  list: function (req, res) {
    Games.find(function (err, games) {
      if (err) {
        return res.status(500).json({
          message: 'Error listing Games'
        })
      }
      return res.json(games)
    })
  },
  show: function (req, res) {
    var id = req.params.id
    Games.findOne({ _id: id }, function (err, game) {
      if (err) {
        return res.status(500).json({
          message: 'Error retrieving Game'
        })
      }
      if (!game) {
        return res.status(404).json({
          message: 'Game not Found'
        })
      }
      return res.json(game)
    })
  },
  create: function (req, res) {
    var game = new Games(req.body)
    game.save(function (err, game) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving game',
          error: err
        })
      }
      return res.status(201).json({
        message: 'saved',
        _id: game._id,
      })
    })
  },
  update: function (req, res) {
    var id = req.params.id
    Games.findOne({ _id: id }, function (err, game) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving Game',
          error: err
        })
      }
      if (!game) {
        return res.status(404).json({
          message: 'Game not found'
        })
      }
      game.number = req.body.number
      game.room = req.body.room
      game.result = req.body.result
      game.winner = req.body.winner
      game.player1 = req.body.player1
      game.player2 = req.body.player2
      game.save(function (err, game) {
        if (err) {
          return res.status(500).json({
            message: 'Error saving game'
          })
        }
        if (!game) {
          return res.status(404).json({
            message: 'Game not found'
          })
        }
        return res.json(game)
      })
    })
  },
  remove: function (req, res) {
    var id = req.params.id
    Games.findByIdAndRemove(id, function (err, game) {
      if (err) {
        return res.json(500, {
          message: 'Game not found'
        })
      }
      return res.json(game)
    })
  }
}