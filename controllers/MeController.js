var https = require('https');
var qs = require('querystring');
// Models
var Device = require('../models/DeviceModel');
var User = require('../models/UserModel');

var findOrCreateUser = function(obj, res) {
    var data = {};
    data.venmo_id = obj.user.id.toString();
    User.findOne(data, function(err, out) {
        out = out || {};

        if (!Object.keys(out).length) {
            // user doesn't exist in mongo yet
            data.access_token = obj.access_token;
            data.name = obj.user.display_name;
            data.devices = [];
            var user = new User(data);
            user.save(function(err) {
                if (err) { return console.error(err); }
            });
            res.send(user);
        } else {
            fetchDevices(out);
        }
    });

    var fetchDevices = function(me) {
        Device.find({ owner: me.venmo_id }, function(err, arr){
            me.devices = arr;
            me = JSON.stringify(me);
            res.send(me);
        });
    };
};

exports.postMe = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var authCode = req.body.code;

    var params = {
        client_id: process.env.NO_QUARTER_CLIENT_ID,
        client_secret: process.env.NO_QUARTER_CLIENT_SECRET,
        code: authCode
    };

    params = qs.stringify(params);

    var options = {
        hostname: 'api.venmo.com',
        path: '/v1/oauth/access_token?' + params,
        method: 'POST'
    };

    venmo = https.request(options, function(data) {
        var userData = '';
        data.on('data', function(d) {
            userData += d;
        });
        data.on('end', function() {
            var user = JSON.parse(userData);
            findOrCreateUser(user, res);
        });
        data.on('error', function() {
            console.error(arguments);
        });
    });
    venmo.on('error', function(err) {
        console.error(err);
    });
    venmo.end();
};


exports.getMe = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");

    var id = req.params.id;

    User.findById(id, function(err, me) {
        fetchDevices(me);
    });


    var fetchDevices = function(me) {
        Device.find({ owner: me.venmo_id }, function(err, arr){
            me.devices = arr;
            me = JSON.stringify(me);
            res.send(me);
        });
    };
};
