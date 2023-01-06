var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var gameAppRouter = require('./routes/game-app');
const { randomUUID } = require('crypto');
const { join } = require('path');
var app = express();

const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/fullStack';

mongoose.connect(url,{
  useNewUrlParser:  true,
})
.then( ()=>console.log("Conectado con mongo") )
.catch( (e)=> console.log("Error al conectador con mongo:"+e))

const pruebaMongo = mongoose.Schema({
  nombre: String,
  edad: Number,
  pais: String
},{versionKey: false})
const MongoModel = mongoose.model("prueba", pruebaMongo, "prueba")
//Mostrar
const show = async ()=>{
  const pruebas = await MongoModel.find({})
  console.log(pruebas)
}
//Crear
const create = async()=>{
  const pruebaMongo = new MongoModel({
    nombre: "pueba2",
    edad: 2,
    pais: "prueba2"
  })
  const resultado = await pruebaMongo.save()
  console.log(resultado)
}

//Update
const update = async(id)=>{
  const prueba = await MongoModel.updateOne({_id:id},
    {
      $set:{
        nombre: 'modificado',
        pais: 'modificado'
      }
    })
}



//create()
//show()
update('639dd263353349cb796af387')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
app.use('/favicons', express.static(__dirname + '/node_modules/express-favicon/index.js'));

app.use(indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
