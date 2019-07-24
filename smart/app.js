/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

// Database & Session
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Configuring the database
const uri = 'mongodb+srv://capricornpopcorn:admin@cluster0-3cukf.mongodb.net/smart?retryWrites=true&w=majority';

// Connecting to the database
mongoose.set('useCreateIndex', true);
mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Showing request
app.use(function(req, res, next) {
  console.log(`${req.method} request for '${req.url}' - %j`, req.body);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Calling Routes
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const appliancesRouter = require('./routes/appliance');
const contactRouter = require('./routes/contact');
// const itemRouter = require('./routes/item');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Call out the routes of pages
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/appliance', appliancesRouter);
app.use('/contact', contactRouter);
// app.use('/item', itemRouter);

//  Middleware for making sessions. 
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'session',
  url: 'mongodb+srv://capricornpopcorn:admin@cluster0-3cukf.mongodb.net/smart?retryWrites=true&w=majority'
});
app.use(session({
      secret: 'my very secret sign key',
      store: sessionStore,
      resave: false,
      saveUninitialized: true
     }));

// Middleware for counting sessions
app.use(function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    console.log(req.session.views);
  }
  else {
    req.session.views = 1;
  }
  next();
});

// // To view number of times you have visited pages in one session
app.get('/count', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.write('<p> You have viewed pages ' + req.session.views + ' times </p>');
  res.end();
});

// // parse requests of content-type - application/json
// app.use(bodyParser.json())

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

app.listen(7860, function () {
  console.log('Smart app listening on port 7860.')
})

module.exports = app;
