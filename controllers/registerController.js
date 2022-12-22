const users = require('../models/UserRegisters').users;
const Player = require('../models/Player');
const {insertJugador} = require("../js/db");

function register(request,response){
  response.render('register', {title: 'Register', name: 'register.css'});
  response.end();
}

exports.register = register;
