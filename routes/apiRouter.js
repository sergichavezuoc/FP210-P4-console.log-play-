var express = require('express');
var router = express.Router();
var apiGamesController = require ('../controllers/apiGamesController')
var apiPlayersController = require ('../controllers/apiPlayersController')
var apiRoomsController = require ('../controllers/apiRoomsController')
/**
 * routes for API
 */
 router.get('/getResultsAjax', function(req, res) {
    apiGamesController.list(req, res)
    // #swagger.tags = ['Games']
  })
 router.get('/api/game/search', function(req, res) {
    apiGamesController.search(req, res)
      // #swagger.tags = ['Games']
  })
  router.get('/api/game/', function(req, res) {
    apiGamesController.list(req, res)
      // #swagger.tags = ['Games']
  })
  router.get('/api/game/:id', function(req, res) {
    apiGamesController.show(req, res)
      // #swagger.tags = ['Games']
  })
  router.post('/api/game/', function(req, res) {
    apiGamesController.create(req, res)
      // #swagger.tags = ['Games']
            /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Adding new Game.',
                schema: {
                  $number: 9, 
                  $room: "room1", 
                  result: 13,
                  winner: "s@s.es",
                  player1: "r@r.es",
                  player2: "s@s.es" 
                }
        } */
  })
  router.put('/api/game/:id', function(req, res) {
    apiGamesController.update(req, res)
      // #swagger.tags = ['Games']
  })
  router.delete('/api/game/:id', function(req, res) {
    apiGamesController.remove(req, res)
      // #swagger.tags = ['Games']
  })
  router.get('/api/player/search', function(req, res) {
    apiPlayersController.search(req, res)
  })
  router.get('/api/player/', function(req, res) {
    apiPlayersController.list(req, res)
  })
  router.get('/api/player/:id', function(req, res) {
    apiPlayersController.show(req, res)
  })
  router.post('/api/player/', function(req, res) {
    apiPlayersController.create(req, res)
  })
  router.put('/api/player/:id', function(req, res) {
    apiPlayersController.update(req, res)
  })
  router.delete('/api/player/:id', function(req, res) {
    apiPlayersController.remove(req, res)
  })
 router.get('/api/room/search', function(req, res) {
    apiRoomsController.search(req, res)
  })
  router.get('/api/room/', function(req, res) {
    apiRoomsController.list(req, res)
  })
  router.get('/api/room/:id', function(req, res) {
    apiRoomsController.show(req, res)
  })
  router.get('/api/ocupationroom/:room', function(req, res) {
    apiRoomsController.ocupationroom(req, res)
  })
  router.put('/api/room/:room/player/:player', function(req, res) {
    apiRoomsController.userinroom(req, res)
  })
  router.post('/api/room/', function(req, res) {
    apiRoomsController.create(req, res)
  })
  router.put('/api/room/:id', function(req, res) {
    apiRoomsController.update(req, res)
  })
  router.delete('/api/room/:id', function(req, res) {
    apiRoomsController.remove(req, res)
  })
module.exports = router;
