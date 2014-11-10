// Modules
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
// Controllers
var friendsController = require('./controllers/FriendsController');
var meController = require('./controllers/MeController');
var deviceController = require('./controllers/DeviceController');
// Mongo
var database = require('./database');

var app = express();
// Middleware
app.use(bodyParser());
// Routes
app.get('/users/:id', meController.getMe);
app.post('/me', meController.postMe);
app.get('/friends', friendsController.getFriends);
app.get('/devices/:id', deviceController.getSingleDevice);
app.get('/friends/:id', friendsController.getSingleFriend);
app.get('/devices', deviceController.getDevices);
app.options('/devices', deviceController.optionsDevice);
app.options('/devices/:id', deviceController.optionsDevice);
app.put('/devices/:id', deviceController.putDevice);
app.post('/devices', deviceController.postDevice);
app.post('/paydevice', deviceController.payDevice);

app.listen(3000);
