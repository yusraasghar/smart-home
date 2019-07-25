/* eslint-disable no-unused-consts */
/* eslint-disable no-undef */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
// var app = require('http').createServer(handler);
// SocketIO.io
const server = app.listen(7860);
//const socket = require('socket.io')(app);
const socket = require('socket.io');
const io = socket.listen(server);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// io.on('connection', function(socket){
//   socket.emit('request', /* */); // emit an event to the socket
//   io.emit('broadcast', /* */); // emit an event to all connected sockets
//   socket.on('reply', function(){ /* */ }); // listen to the event
// });
// // WARNING: the client will NOT be able to connect!
// const client = io('ws://echo.websocket.org');

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
const itemRouter = require('./routes/item');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Call out the routes of pages
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/appliance', appliancesRouter);
app.use('/contact', contactRouter);
app.use('/item', itemRouter);

//  Middleware for making sessions. 
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'session',
  url: uri
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

// Socket.io
io.on("connection", socket => {
    console.log("New client connected" + socket.id);
    //console.log(socket);
    // Returning the initial data of food menu from FoodItems collection
    // socket.on("initial_data", () => {
    //   collection_foodItems.find({}).then(docs => {
    //     io.sockets.emit("get_data", docs);
    //   });
    // });
  // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
    socket.on("status", (item) => {
      console.log('here');
      io.sockets.emit('status', item);
    });
          // Emitting event to update the Kitchen opened across the devices with the realtime order values
          //io.sockets.emit("change_data");
       // });
    //});
  // Order completion, gets called from /src/main/Kitchen.js
    socket.on("mark_done", id => {
      collection_foodItems
        .update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
        .then(updatedDoc => {
          //Updating the different Kitchen area with the current Status.
          io.sockets.emit("change_data");
        });
    });
  
  // Functionality to change the predicted quantity value, called from /src/main/UpdatePredicted.js
    socket.on("ChangePred", predicted_data => {
      collection_foodItems
        .update(
          { _id: predicted_data._id },
          { $set: { predQty: predicted_data.predQty } }
        )
        .then(updatedDoc => {
          // Socket event to update the Predicted quantity across the Kitchen
          io.sockets.emit("change_data");
        });
    });
  
  // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  
// io.on('connection', function (socket) {
//   console.log('A client is connected!');
//   socket.emit('message', function () {
//       console.log('You are connected!');
//   // socket.emit('news', { hello: 'world' });
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   });
// });

// // parse requests of content-type - application/json
// app.use(bodyParser.json())

// Socket IO (heroku)
// const server = app.listen(7860, function () {
//   console.log('Smart app listening on port 7860.')
// })
// const socket = require('socket.io');
// const io = socket.listen(server);  

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });
// console.log(io);   

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// const webSocket = io(
//   // 'http://localhost', {path: '/myownpath'}
//   );
// const el = document.getElementById('server-time');

// webSocket.on('time', function(timeString) {
//   el.innerHTML = 'Server time: ' + timeString;
// });

// stackflow ka tareeqa
// app.set('port', process.env.PORT || 7860);
// const server = http.createServer(app);
// const io = require('socket.io').listen(server);
// server.listen(app.get('port'));

// SocketIO.io
// io.on('connection', function(socket){
//   console.log(io);
//   socket.on('changes', function(msg) {
//       io.emit('changes', msg);
//     });
// }); 

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(7860, () => console.log(`Listening on ${ PORT }`));

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
