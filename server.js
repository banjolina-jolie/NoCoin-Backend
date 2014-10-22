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
app.get('/me', meController.getMe);
// app.get('/me/devices', meController.getMyDevices);
app.get('/friends', friendsController.getFriends);
app.get('/friends/:id', friendsController.getSingleFriend);
// app.get('/payfriend', friendsController.payFriend);
app.get('/devices', deviceController.getDevices);
app.options('/devices', deviceController.optionsDevice);
app.post('/devices', deviceController.postDevice);
app.get('/paydevice', deviceController.payDevice);

app.listen(3000);
