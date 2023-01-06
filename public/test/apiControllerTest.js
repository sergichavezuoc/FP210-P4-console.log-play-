const { rooms } = require('../models/RoomData')



function getSalas(request, response) {
    
    response.json(rooms);

  }

function getOnlyRoom(request, response) {
    const { room } = request.params;
    let rN = (parseInt(room)-1)
    
    response.json(rooms[rN]);

  }

function joinRoom(request, response){

    
    const { user } = request.params;
    const { room } = request.params;

    let rN = (parseInt(room)-1)

    if(rooms[rN]['player1']=="")
        rooms[rN]['player1']=user;
        else  if(rooms[rN]['player2']=="")
            rooms[rN]['player2']=user;
    
    
    //room[room].setPlayer1(player)

    response.json(JSON.stringify(rooms));
}


function leaveRoom(request,response){
    const { user } = request.params;
    const { room } = request.params;

    let rN = (parseInt(room)-1)

    if(rooms[rN]['player1']==user)
    rooms[rN]['player1']="";
    else  if(rooms[rN]['player2']==user)
        rooms[rN]['player2']="";

    response.json(rooms);

}
  
  exports.getSalas = getSalas;
  exports.getOnlyRoom = getOnlyRoom;
  exports.joinRoom = joinRoom;
  exports.leaveRoom = leaveRoom;