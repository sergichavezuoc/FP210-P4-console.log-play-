var express = require('express');
var router = express.Router();
var {init} = require("../controllers/indexController")
var {renderGame} = require("../controllers/gameController");
var {login, logOut} = require("../controllers/loginController")
var {register, validatedRegister} = require("../controllers/registerController");
var { gameApp, ocupation, ocupationcheck, disconnect } = require("../controllers/gameAppController");
var apiGamesController = require ('../controllers/apiGamesController')
var apiPlayersController = require ('../controllers/apiPlayersController')
var apiRoomsController = require ('../controllers/apiRoomsController')
/* GET home page. */
router.get('/', init);
router.get('/game', renderGame);
router.post('/login', login);
router.get('/logOut', logOut);
router.get('/register', register);
router.post('/validated-register', validatedRegister);
router.get('/game-app', gameApp);
router.get('/ocupationcheck', ocupationcheck)
router.get('/disconnect', disconnect)
router.get('/ocupation', ocupation)
/**
 * routes for API
 */
 router.get('/getResultsAjax', function(req, res) {
    apiGamesController.list(req, res)
  })
 router.get('/api/game/search', function(req, res) {
    apiGamesController.search(req, res)
  })
  router.get('/api/game/', function(req, res) {
    apiGamesController.list(req, res)
  })
  router.get('/api/game/:id', function(req, res) {
    apiGamesController.show(req, res)
  })
  router.post('/api/game/', function(req, res) {
    apiGamesController.create(req, res)
  })
  router.put('/api/game/:id', function(req, res) {
    apiGamesController.update(req, res)
  })
  router.delete('/api/game/:id', function(req, res) {
    apiGamesController.remove(req, res)
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
