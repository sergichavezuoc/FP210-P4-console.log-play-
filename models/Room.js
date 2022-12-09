var mongoose = require('mongoose')
var Schema = mongoose.Schema

var roomsSchema = new Schema({
  _id: Number,
  number: String, 
  name: String,
  player1: String,
  player2: String
})
var aa = mongoose.model('Salas', roomsSchema)
module.exports = class Room {
  constructor(_id,number, name, player1, player2) {

    this.number = number;
    this.name = name;
    this.player1 = player1;
    this.player2 = player2;
  }

  getNumber() {
    return this.number;
  }
  getName() {
    return this.name;
  }

  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }

  setNumber(newNumber) {
    this.number = newNumber;
  }

  setName(newName) {
    this.name = newName;
  }

  setPlayer1(player1) {
    this.player1 = player1;
  }

  setPlayer2(player2) {
    this.player2 = player2;
  }

  playersInRoom() {
    let numberPlayers = 0;
    if (player1) {
      numberPlayers++;
    }
    if (player2) {
      numberPlayers++;
    }
    return numberPlayers;
  }
}
module.exports = aa;

