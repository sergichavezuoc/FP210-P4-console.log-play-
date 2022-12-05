const { getJugadores } = require('../js/db');

const jugadores = require('../models/UserRegisters').users;
const rooms = require('../models/RoomData').rooms;

function login(request, response) {
    console.log("jugadores");
    getJugadores(jugadores);
    console.log(jugadores);
    var item = jugadores.find(item => item.username === request.body.username);
    console.log(item);
    if (item !== undefined) {
        if (item.username === request.body.username && item.password === request.body.password) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end();
        }

        if (item.username === request.body.username && item.password !== request.body.password) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end();
        }
    }

    if (item === undefined) {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end();
    }

    response.end()
}

function logOut(request, response) {

    var userNameLogOut = request.query.user

    rooms.forEach(room => {
        for (const key in room) {
            if (key === 'player1') {
                var value = room[key];
                if (value === userNameLogOut) {
                    room[key] = '';
                }
            }
            if (key === 'player2') {
                var value = room[key];
                if (value === userNameLogOut) {
                    room[key] = '';
                }
            }
        }

    });

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end();
}


exports.login = login;
exports.logOut = logOut;