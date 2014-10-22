var https = require('https');
var Device = require('../models/DeviceModel');

exports.getMe = function(req, res){
    var venmo;

    res.header("Access-Control-Allow-Origin", "*");

    var accessToken = req.query.access_token;

    venmo = https.get('https://api.venmo.com/v1/me?access_token=' + accessToken, function(data) {
        var json = '';
        data.on('data', function(d) {
            json += d;
        });

        data.on('end', function() {
            json = JSON.parse(json);
            fetchDevices(json);
        });
    });

    var fetchDevices = function(json) {
        if (!json.data) {
            return console.error(json);
        }

        var id = json.data.user.id;

        Device.find({ owner: id }, function(err, arr){
            json.devices = arr;
            json = JSON.stringify(json);
            res.send(json);
        });

    };

    venmo.on('error', console.error);
};
