const Rooms = require('../models/Room')

async function logOut(request, response) {
    var username = request.query.user
    try{
        const data = await  Rooms.updateMany({player1: username}, {$set: {player1: ''}})
        const data2 = await Rooms.updateMany({player2: username}, {$set: {player2: ''}})
        if( data.acknowledged && data2.acknowledged){
          return response.json(200, {
            message: 'All rooms left'
        })
        }
      }catch(error){
        return response.json(500, {
          message: 'Error leaving the rooms'
        })
      }
    response.end();
}

exports.logOut = logOut;