/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

// Socket.io
const server = app.listen(7860);
const socket = require('socket.io');
const io = socket.listen(server);

// Database
const mongoose = require('mongoose');

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
const demoRouter = require('./routes/demo');
const itemRouter = require('./routes/item');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Call out the routes of pages
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/appliance', appliancesRouter);
app.use('/contact', contactRouter);
app.use('/item', itemRouter);
app.use('/demo', demoRouter);

// Socket.io Configuration..
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  socket.on('status',(item) => {
    io.sockets.emit('status',  (item));
    console.log(item);
   
  });
});

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

module.exports = {app,server};