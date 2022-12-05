const users = require('../models/UserRegisters').users;
const Player = require('../models/Player');
const {insertJugador} = require("../js/db");

function register(request,response){
  response.render('register', {title: 'Register', name: 'register.css'});
  response.end();
}

function validatedRegister(request,response){
  
  const newUser = new Player(request.body.name, request.body.username, request.body.password);
  users.push(newUser);
  insertJugador(newUser);
  response.end()
}

exports.register = register;
exports.validatedRegister = validatedRegister;