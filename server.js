// Modules
var express = require('express');
var fs = require('fs');
var database = require('./database');
// Controllers
var friendsController = require('./controllers/FriendsController');
var meController = require('./controllers/MeController');
var deviceController = require('./controllers/DeviceController');

// var hskey = fs.readFileSync('hacksparrow-key.pem');
// var hscert = fs.readFileSync('hacksparrow-cert.pem');

// var options = {
//     key: hskey,
//     cert: hscert
// };


var app = express();

app.get('/me', meController.getMe);
app.get('/friends', friendsController.getFriends);
// app.get('/payfriend', friendsController.payFriend);
app.get('/devices', deviceController.getDevices);
app.get('/paydevice', deviceController.payDevice);

app.listen(3000);
