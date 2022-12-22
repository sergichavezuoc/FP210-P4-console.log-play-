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
    // #swagger.summary = 'Get Game Results. '
    // #swagger.description = 'Endpoint to get all Games results. '
    // #swagger.tags = ['Games']
            /* #swagger.responses[200] = {
            description: 'Game list with results.',
            schema: {
                    _id: "638dd84bf95b105648ae0b2d",
                    number: "5c7230e8-f784-40bd-89ad-870a7f7f7ac5",
                    room: "room1",
                    result: 25,
                    winner: "j@j.es",
                    player1: "j@j.es",
                    player2: "i@i.es"
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Games.',
            schema: { 
                    $message: 'Error listing games' ,
                    }
        } */
 
  })
 router.get('/api/game/search', function(req, res) {
    apiGamesController.search(req, res)
    // #swagger.summary = 'Get Games with filters. '
    // #swagger.description = 'Endpoint to get Games filtered by query search. '
      // #swagger.tags = ['Games']
           /* #swagger.responses[200] = {
            description: 'Game list with results.',
            schema: {
                    _id: "638dd84bf95b105648ae0b2d",
                    number: "5c7230e8-f784-40bd-89ad-870a7f7f7ac5",
                    room: "room1",
                    result: 25,
                    winner: "j@j.es",
                    player1: "j@j.es",
                    player2: "i@i.es"
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Games.',
            schema: { 
                    $message: 'Error listing games' ,
                    }
        } */
  })
  router.get('/api/game/', function(req, res) {
    apiGamesController.list(req, res)
    // #swagger.summary = 'Get Game Results. '
    // #swagger.description = 'Endpoint to get all Games results. '
    // #swagger.tags = ['Games']
           /* #swagger.responses[200] = {
            description: 'Game list with results.',
            schema: {
                    _id: "638dd84bf95b105648ae0b2d",
                    number: "5c7230e8-f784-40bd-89ad-870a7f7f7ac5",
                    room: "room1",
                    result: 25,
                    winner: "j@j.es",
                    player1: "j@j.es",
                    player2: "i@i.es"
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Games.',
            schema: { 
                    $message: 'Error listing games' ,
                    }
        } */

  })
  router.get('/api/game/:id', function(req, res) {
    apiGamesController.show(req, res)
    // #swagger.summary = 'Get ONE Game. '
    // #swagger.description = 'Endpoint to get one Game filtering by Game Id. '
    // #swagger.tags = ['Games']
           /* #swagger.responses[200] = {
            description: 'Game by Id.',
            schema: {
                    _id: "638dd84bf95b105648ae0b2d",
                    number: "5c7230e8-f784-40bd-89ad-870a7f7f7ac5",
                    room: "room1",
                    result: 25,
                    winner: "j@j.es",
                    player1: "j@j.es",
                    player2: "i@i.es"
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Game not found.',
            schema: { 
                    $message: 'Error Game not found' ,
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error retrieving Game.',
            schema: { 
                    $message: 'Error retrieving game' ,
                    }
            } */
  })
  router.post('/api/game/', function(req, res) {
    apiGamesController.create(req, res)
      // #swagger.summary = 'Create Game. '
      // #swagger.description = 'Endpoint to create new Games. Requires a Game send in JSON as the one in the example'
      // #swagger.tags = ['Games']
            /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Game Object',
                schema: {
                  $number: 9, 
                  $room: "room1", 
                  result: 13,
                  winner: "s@s.es",
                  player1: "r@r.es",
                  player2: "s@s.es" 
                }
        } */
            /* #swagger.responses[201] = {
            description: 'Game successfully created.',
            schema: { 
                    $message: 'saved' ,
                    $_id: 'game_id'
                    }
        } */
            /* #swagger.responses[500] = {
            description: 'Error creating Game.',
            schema: { 
                    $message: 'Error saving game' ,
                    $err: 'error received'
                    }
        } */
  })
  router.put('/api/game/:id', function(req, res) {
    apiGamesController.update(req, res)
      // #swagger.summary = 'Modify Game. '
      // #swagger.description = 'Endpoint to modify Games. Requires Game identifier in URL request. Requires a Game send in JSON as the one in the example. '
      // #swagger.tags = ['Games']
            /*  
                #swagger.parameters['id'] = {
                in: 'path',
                description: 'Game identifier',
                schema: "312343434"
                }  
                #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Game Object',
                schema: {
                  number: 9, 
                  room: "room1", 
                  result: 13,
                  winner: "s@s.es",
                  player1: "r@r.es",
                  player2: "s@s.es" 
                }
        } */
            /* #swagger.responses[200] = {
            description: 'Game successfully modified.',
            schema: {
                  _id: "2345234535", 
                  number: 9, 
                  room: "room1", 
                  result: 13,
                  winner: "s@s.es",
                  player1: "r@r.es",
                  player2: "s@s.es" 
                    }
          } */
            /* #swagger.responses[404] = {
            description: 'The Game to modify was not found.',
            schema: { 
                    $message: 'Error game not found' ,
                    $err: 'error received'
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error creating Game.',
            schema: { 
                    $message: 'Error saving game' ,
                    $err: 'error received'
                    }
        } */
  })
  router.delete('/api/game/:id', function(req, res) {
    apiGamesController.remove(req, res)
    // #swagger.summary = 'Delete Game. '
    // #swagger.description = 'Endpoint to delete a Game by Id. '
    // #swagger.tags = ['Games']
              /* #swagger.responses[200] = {
            description: 'Game successfully deleted.',
            schema: {
                  _id: "2345234535", 
                  number: 9, 
                  room: "room1", 
                  result: 13,
                  winner: "s@s.es",
                  player1: "r@r.es",
                  player2: "s@s.es" 
                    }
          } */
            /* #swagger.responses[500] = {
            description: 'Error deleting Game.',
            schema: { 
                    $message: 'Game not found' 
                    }
  })
  router.get('/api/player/search', function(req, res) {
    apiPlayersController.search(req, res)
    // #swagger.summary = 'Get Players with filters. '
    // #swagger.description = 'Endpoint to get Players filtered by query search. '
      // #swagger.tags = ['Players']
             /* #swagger.responses[200] = {
            description: 'Players list.',
            schema: {
                  $name: "Juan", 
                  $username: "j@j.es", 
                  $password: "12345"
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Players.',
            schema: { 
                    $message: 'Error listing players' ,
                    }
        } */
  })
  router.get('/api/player/', function(req, res) {
    apiPlayersController.list(req, res)
    // #swagger.summary = 'Get Players. '
    // #swagger.description = 'Endpoint to get all Players. '
      // #swagger.tags = ['Players']
             /* #swagger.responses[200] = {
            description: 'Players list.',
            schema: {
                  $name: "Juan", 
                  $username: "j@j.es", 
                  $password: "12345"
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Players.',
            schema: { 
                    $message: 'Error listing players' ,
                    }
        } */

  })
  router.post('/api/player/login/', function(req, res) {
    apiPlayersController.login(req, res)
    // #swagger.summary = 'Player Login. '
    // #swagger.description = 'Endpoint to Player by username and password. '
      // #swagger.tags = ['Players']
            /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Player Object',
                schema: { 
                  $username: "j@j.es", 
                  $password: "12345"
                }
        } */
            /* #swagger.responses[200] = {
            description: 'Player found.',
            schema: { 
                  $name: "Juan",
                  $username: "j@j.es", 
                  $password: "12345"
                    }
            } */
            /* #swagger.responses[404] = {
            description: 'Player not found.',
            schema: { 
                    $message: 'Player not found' 
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error searching Player.',
            schema: { 
                    $message: 'Error searching player'
                    }
            } */
  })
  router.get('/api/player/:id', function(req, res) {
    apiPlayersController.show(req, res)
    // #swagger.summary = 'Get ONE Player. '
    // #swagger.description = 'Endpoint to get one Game filtering by username. '
      // #swagger.tags = ['Players']
           /* #swagger.responses[200] = {
            description: 'Player by Id.',
            schema: {
                  $name: "Juan", 
                  $username: "j@j.es", 
                  $password: "12345"
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Player not found.',
            schema: { 
                    $message: 'Error Player not found' ,
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error retrieving Player.',
            schema: { 
                    $message: 'Error retrieving player' ,
                    }
            } */
  })
  router.post('/api/player/', function(req, res) {
    apiPlayersController.create(req, res)
      // #swagger.summary = 'Create Player. '
      // #swagger.description = 'Endpoint to create new Players. Requires a Player send in JSON as the one in the example'
      // #swagger.tags = ['Players']
            /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Player Object',
                schema: {
                  $name: "Juan", 
                  $username: "j@j.es", 
                  $password: "12345"
                }
        } */
            /* #swagger.responses[201] = {
            description: 'Player successfully created.',
            schema: { 
                    $message: 'saved' ,
                    $_id: 'game_id'
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error creating Player.',
            schema: { 
                    $message: 'Error saving player' ,
                    $err: 'error received'
                    }
            } */
  })
  router.put('/api/player/:id', function(req, res) {
    apiPlayersController.update(req, res)
    // #swagger.summary = 'Modify Player. '
    // #swagger.description = 'Endpoint to modifiy Player filtering by Player username. '
    // #swagger.tags = ['Players']
             /* #swagger.responses[200] = {
            description: 'Player Modified.',
            schema: {
                  $name: "Juan", 
                  $username: "j@j.es", 
                  $password: "12345"
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Error updating Player.',
            schema: { 
                    $message: 'Player not found' ,
                    }
        } */
            /* #swagger.responses[500] = {
            description: 'Error updating Player.',
            schema: { 
                    $message: 'Error updating player' ,
                    }
        } */
  })
  router.delete('/api/player/:id', function(req, res) {
    apiPlayersController.remove(req, res)
    // #swagger.summary = 'Delete Player. '
    // #swagger.description = 'Endpoint to DELETE one Player filtering by Player Id. '
    // #swagger.tags = ['Players']
             /* #swagger.responses[200] = {
            description: 'Player deleted.',
            schema: {
                  $name: "Juan", 
                  $username: "j@j.es", 
                  $password: "12345"
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Error deleting Player.',
            schema: { 
                    $message: 'Player not found' ,
                    }
        } */
            /* #swagger.responses[500] = {
            description: 'Error deleting Player.',
            schema: { 
                    $message: 'Error deleting player' ,
                    }
        } */

  })
 router.get('/api/room/search', function(req, res) {
    apiRoomsController.search(req, res)
    // #swagger.summary = 'Get Rooms with filters. '
    // #swagger.description = 'Endpoint to get Rooms filtered by query search. '
      // #swagger.tags = ['Rooms']
            /* #swagger.responses[200] = {
            description: 'Rooms list.',
            schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Rooms.',
            schema: { 
                    $message: 'Error listing rooms' ,
                    }
        } */
  })
  router.get('/api/room/', function(req, res) {
    apiRoomsController.list(req, res)
    // #swagger.summary = 'Get Rooms. '
    // #swagger.description = 'Endpoint to get all Rooms. '
    // #swagger.tags = ['Rooms']
               /* #swagger.responses[200] = {
            description: 'Rooms list.',
            schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                    }
                  }*/
            /* #swagger.responses[500] = {
            description: 'Error listing Rooms.',
            schema: { 
                    $message: 'Error listing rooms' ,
                    }
        } */
  })
  router.get('/api/room/:id', function(req, res) {
    apiRoomsController.show(req, res)
    // #swagger.summary = 'Get ONE Room. '
    // #swagger.description = 'Endpoint to get one Room filtering by Room Id. '
      // #swagger.tags = ['Rooms']
            /* #swagger.responses[200] = {
            description: 'Room by Id.',
            schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Room not found.',
            schema: { 
                    $message: 'Error Room not found' ,
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error retrieving Room.',
            schema: { 
                    $message: 'Error retrieving room' ,
                    }
            } */
  })
  router.get('/api/ocupationroom/:room', function(req, res) {
    apiRoomsController.ocupationroom(req, res)
    // #swagger.summary = 'Get Room ocupation. '
    // #swagger.description = 'Endpoint to get number of Players in a Room. The response is HTML'
    // #swagger.tags = ['Rooms']
            /* #swagger.responses[200] = {
            description: 'Room ocupation',
            body: '<i id="oroom2" style="" class="fa fa-user-times fa-2x"></i>'
                  }*/    
                /* #swagger.responses[404] = {
            description: 'Room not found.',
            schema: { 
                    $message: 'Error Room not found' ,
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error retrieving Room.',
            schema: { 
                    $message: 'Error retrieving room' ,
                    }
            } */
  })
  router.put('/api/room/:room/player/:player', function(req, res) {
    apiRoomsController.userinroom(req, res)
    // #swagger.summary = 'Modify Room to pu Player in Room. '
    // #swagger.description = 'Endpoint to add Player to a Room. '
    // #swagger.tags = ['Rooms']
    // #swagger.tags = ['Players']
             /* #swagger.responses[200] = {
            description: 'Room Modified.',
            schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Error updating Room.',
            schema: { 
                    $message: 'Room not found' ,
                    }
        } */
            /* #swagger.responses[500] = {
            description: 'Error updating Room.',
            schema: { 
                    $message: 'Error updating player' ,
                    }
        } */
  })
  router.post('/api/room/', function(req, res) {
    apiRoomsController.create(req, res)
      // #swagger.summary = 'Create Room. '
      // #swagger.description = 'Endpoint to create new Rooms. Requires a Room object send in JSON as the one in the example'
      // #swagger.tags = ['Rooms']
            /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Room Object',
                schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                }
        } */
            /* #swagger.responses[201] = {
            description: 'Room successfully created.',
            schema: { 
                    $message: 'saved' ,
                    $_id: 'game_id'
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error creating Room.',
            schema: { 
                    $message: 'Error saving room' ,
                    $err: 'error received'
                    }
            } */

  })
  router.put('/api/room/:id', function(req, res) {
    apiRoomsController.update(req, res)
    // #swagger.summary = 'Modify Room. '
    // #swagger.description = 'Endpoint to modifiy Room filtering by Room Id. '
    // #swagger.tags = ['Rooms']
              /* #swagger.responses[200] = {
            description: 'Room Modified.',
            schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                    }
                  }*/
            /* #swagger.responses[404] = {
            description: 'Error updating Room.',
            schema: { 
                    $message: 'Room not found' ,
                    }
        } */
            /* #swagger.responses[500] = {
            description: 'Error updating Room.',
            schema: { 
                    $message: 'Error updating player' ,
                    }
        } */
  })
  router.delete('/api/room/:id', function(req, res) {
    apiRoomsController.remove(req, res)
    // #swagger.summary = 'Delete Room. '
    // #swagger.description = 'Endpoint to DELETE Room filtering by Room Id. '
    // #swagger.tags = ['Rooms']
                 /* #swagger.responses[200] = {
            description: 'Room deleted.',
            schema: {
                  $_id: 12,
                  $number: "room12", 
                  $name: "Room 12",
                  player1: "",
                  player2: ""
                    }
                  }*/
  })
  router.get('/api/roomhtml/:id', function(req, res) {
    apiRoomsController.showhtml(req, res)
    // #swagger.summary = 'Room ocupation. '
    // #swagger.description = 'Endpoint to get room ocupation in HTML. '
    // #swagger.tags = ['Rooms']
              /* #swagger.responses[200] = {
            description: 'Players in room: xxxx',
            body: 'Players in room: xxxx'
              } */
            /* #swagger.responses[404] = {
            description: 'Error locating Room.',
            schema: { 
                    $message: 'Room not found' ,
                    }
        } */
            /* #swagger.responses[500] = {
            description: 'Error locating Room.',
            schema: { 
                    $message: 'Error locating room' ,
                    }
        } */
  });
  router.post('/api/rooms/all-disconect', function(req, res){
    apiRoomsController.disconectAllRooms(req, res)
    // #swagger.summary = 'Leave all rooms '
    // #swagger.description = 'Endpoint to leave all rooms ocupation in case you get stuck due to an error. '
    // #swagger.tags = ['Rooms']
             /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Object',
                schema: {
                  $username: "j@email.com",
                }
        } */
        /* #swagger.responses[200] = {
            description: 'All rooms left',
            schema: { 
                    $message: 'All rooms left'
                    }
            } */
            /* #swagger.responses[500] = {
            description: 'Error leaving the rooms',
            schema: { 
                    $message: 'Error leaving the rooms'
                    }
            } */
  })
module.exports = router;
