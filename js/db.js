var mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_URI = 'mongodb+srv://schavezb:aBk8wL6WbvU7nJ8T@cluster0.vf4ixhj.mongodb.net/?retryWrites=true&w=majority';
const createConnection = () => {
    var MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://schavezb:aBk8wL6WbvU7nJ8T@cluster0.vf4ixhj.mongodb.net/consolelog'
    mongoose.connect(MONGO_URL)
    mongoose.connection.on('connected', function () {
        console.log('Conectado a la base de datos: ' + MONGO_URL)
      })
      
      mongoose.connection.on('error',function (err) {
        console.log('Error al conextar a la base de datos: ' + err)
      })
      
      mongoose.connection.on('disconnected', function () {
        console.log('Desconectado de la base de datos')
      })
      
      process.on('SIGINT', function() {
        mongoose.connection.close(function () {
          console.log('Desconectado de la base de datos al terminar la app')
          process.exit(0)
        })
      })
    }


const createCollection = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").createCollection("salas", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("Collection already exists");
                        }
                        else {
                            console.log("Error creating collection");
                        }
                    }
                    else {
                        console.log("Collection created!");
                        db.close();
                    }
                });
            }
        }
    )
}

const createCollectionJugadores = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").createCollection("jugadores", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("Collection already exists");
                        }
                        else {
                            console.log("Error creating collection");
                        }
                    }
                    else {
                        console.log("Collection created!");
                        db.close();
                    }
                });
            }
        }
    )
}
const createCollectionGame = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").createCollection("games", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("Collection already exists");
                        }
                        else {
                            console.log("Error creating collection");
                        }
                    }
                    else {
                        console.log("Collection created!");
                        db.close();
                    }
                });
            }
        }
    )
}
const insertSala = (sala) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("salas").insertOne(sala, function (err, res) {
                    if (err) {
                        if (err.index == 0 && err.code == 11000) {
                            console.log("Room already exists in Database");
                        }
                        else {
                            console.log("Error al insertar datos");
                        }
                    }
                    else {
                        console.log("Datos de sala insertados!");
                        db.close();
                    }
                });
            }
        }
    )
}

const insertJugador = (jugador) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("jugadores").insertOne(jugador, function (err, res) {
                    if (err) {
                        console.log(err);
                        if (err.index == 0 && err.code == 11000) {
                            console.log("Player already exists in Database");
                        }
                        else {
                            console.log("Error inserting Player");
                        }
                    }
                    else {
                        console.log("Player inserted!");
                        db.close();
                    }
                });
            }
        }
    )
}
const insertGame = (game) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("games").insertOne(game, function (err, res) {
                    if (err) {
                        console.log(err);
                        if (err.index == 0 && err.code == 11000) {
                            console.log("Game already exists in Database");
                        }
                        else {
                            console.log("Error inserting Game");
                        }
                    }
                    else {
                        console.log("Game inserted!");
                        db.close();
                    }
                });
            }
        }
    )
}
const getSalas = (rooms) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("salas").find({}).toArray(function (err, res) {
                    if (err) throw err;
                    res.forEach((i) => {
                        rooms.push(i);
                    })
                        db.close();
                    
                });
            }
        }
    )
}

const getSala = (idSala, sala) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("salas").findOne({ _id: idSala }, function (err, res) {
                    if (err) {
                        console.log("Error locating Room");
                    }
                    else {
                        console.log(sala);
                        sala = res;
                        console.log(sala);
                        db.close();
                    }
                });
            }
        }
    )
}

const getJugador = (idJugador) => {
    return new Promise((resolve, reject) => {

        MongoClient.connect(
            DB_URI,
            (err, db) => {
                if (err) {
                    console.log("Error connecting Database");
                }
                else {

                    db.db("consolelog").collection("jugadores").findOne({ _id: idJugador }, function (err, res) {
                        if (err) {
                            console.log("Error locating Player");
                            reject("Error locating Player");
                        }
                        else {
                            resolve(res);
                            db.close();
                        }
                    });

                }
            }
        )
    });
}

const getJugadores = (jugadores) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("jugadores").find({}).toArray(function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    res.forEach((i) => {
                        jugadores.push(i);
                    })

                    db.close();
                });
            }
        }
    )
}

const actualizarSala = (idSala, sala) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error connecting Database");
            }
            else {
                db.db("consolelog").collection("salas").updateOne({ _id: idSala }, { $set: sala }, function (err, res) {
                    if (err) {
                        console.log("Error updating Room");
                    }
                    else {
                        console.log(res);
                        sala = res;
                        db.close();
                    }
                });
            }
        }
    )
}

const actualizarJugador = (jugador) => {
    return new Promise((resolve, reject) => {
        debugger;
        MongoClient.connect(
            DB_URI,
            (err, db) => {
                if (err) {
                    console.log("Error connecting Database");
                }
                else {
                    db.db("consolelog").collection("jugadores").updateOne({ _id: jugador._id }, { $set: jugador }, function (err, res) {
                        if (err) {
                            console.log("Error updating Player");
                            reject("Error updating Player");
                        }
                        else {
                            resolve(res)
                            db.close();
                        }
                    });
                }
            }
        )
    });
}
exports.createConnection = createConnection;
exports.createCollection = createCollection;
exports.createCollectionJugadores = createCollectionJugadores;
exports.createCollectionGame = createCollectionGame;
exports.insertSala = insertSala;
exports.insertJugador = insertJugador;
exports.insertGame = insertGame;
exports.createCollectionJugadores = createCollectionJugadores;
exports.actualizarJugador = actualizarJugador;
exports.getSala = getSala;
exports.getSalas = getSalas;
exports.getJugador = getJugador;
exports.getJugadores = getJugadores;
exports.actualizarSala = actualizarSala;

