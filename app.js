var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dotenv = require('dotenv');
dotenv.config();

var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var fs = require('fs');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');


var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');

var app = express();

//passport config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  //cookie: { secure: true }
}));

//paspport middle
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//global vars
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//default layout
app.set('layout','layouts/layout');
app.use(expressLayouts);

//set to home db
mongoose.connect('mongodb://127.0.0.1/Home') 
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

/*load all files in models dir
fs.readdirSync(__dirname + '/models').forEach((filename)=>{
  if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});
*/

//static
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);


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
