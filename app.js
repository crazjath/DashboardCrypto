var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var passport = require('passport');




var LoginRouter = require('./routes/Login');
var indexURouter = require('./routes/indexUsuarios');
var rigsURouter = require('./routes/rigsUsuarios');
var finanzasURouter = require('./routes/finanzasUsuarios');
var indexARouter = require('./routes/indexAdmin');
var usersARouter = require('./routes/usersAdmin');
var usersARouter2 = require('./routes/usersAdmin2');
var rigsARouter = require('./routes/rigsAdmin');
var finanzasARouter = require('./routes/finanzasAdmin');
var signupAdminRouter = require('./routes/signupAdmin');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
const fetch = require('node-fetch');


app.use('/', LoginRouter);
app.use('/usuario/Inicio', indexURouter);
app.use('/usuario/rigs', rigsURouter);
app.use('/usuario/finanzas', finanzasURouter);
app.use('/admin/Inicio', indexARouter);
app.use('/admin/users', usersARouter);
app.use('/admin/users/listas', usersARouter2);
app.use('/admin/rigs', rigsARouter);
app.use('/admin/finanzas', finanzasARouter);
app.use('/admin/signupAdmin', signupAdminRouter);

//fetch api
/*fetch(process.env.API_URL)
.then(promesaF => promesaF.json())
.then(contenido => console.log(contenido.data.transactions));*/


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
