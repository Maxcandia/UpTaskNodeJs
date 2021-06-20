const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// helper con funciones
const helpers = require('./helpers');

// Crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));
    // crear una app de express
    const app = express();
    
    app.use(express.static('public'));
    
    // habilitar Pug
    app.set('view engine', 'pug');
    
    //Habilitar el bodyParser para leer datos del formulario
    app.use(bodyParser.urlencoded({extended: true}));

// Agregamos express validator a toda la aplicacion
//app.use(expressValidator());


// Aniadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.use(flash());
app.use(cookieParser());
// Sessiones nos permiten navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUnintialized: false
}));

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});


// ruta para el home
app.use('/', routes() );



app.listen(3000);

