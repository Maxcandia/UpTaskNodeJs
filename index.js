const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');

// helper con funciones
const helpers = require('./helpers');

// Crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));
// crear una app de express
const app = express();

// Agregamos express validator a toda la aplicacion
//app.use(expressValidator());

app.use(express.static('public'));

// habilitar Pug
app.set('view engine', 'pug');


// Aniadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//Habilitar el bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// ruta para el home
app.use('/', routes() );



app.listen(3000);

