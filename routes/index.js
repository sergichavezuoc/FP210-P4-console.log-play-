var express = require('express');
var router = express.Router();
var {init} = require("../controllers/indexController")
var {renderGame} = require("../controllers/gameController");
var {logOut} = require("../controllers/loginController")
var {register} = require("../controllers/registerController");
var { gameApp, disconnect } = require("../controllers/gameAppController");
var apiGamesController = require ('../controllers/apiGamesController')
var apiPlayersController = require ('../controllers/apiPlayersController')
var apiRoomsController = require ('../controllers/apiRoomsController')
/* GET home page. */
router.get('/', init);
router.get('/game', renderGame);
router.get('/logOut', logOut);
router.get('/register', register);
router.get('/game-app', gameApp);
router.get('/disconnect', disconnect)


module.exports = router;
