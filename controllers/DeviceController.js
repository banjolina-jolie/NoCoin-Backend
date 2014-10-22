var https = require('https');
var qs = require('querystring');
var Device = require('../models/DeviceModel');

exports.getDevices = function(req, res) {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "": ""
    });

    Device.find({}, function(err, obj){
        res.send(obj);
    });
};

exports.optionsDevice = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
};

exports.postDevice = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    req.body.price = Number(req.body.price);
    var device = new Device(req.body);
    device.save(function(err) {
        if (err) { return console.error(err); }
    });
    res.send();
};

exports.payDevice  = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var userId = req.query.user_id;
    var accessToken = req.query.access_token;

    var params = {
        access_token: accessToken,
        user_id: userId,
        note: 'Oh bonjour $$',
        amount: 0.01,
        audience: 'public'
    };

    params = qs.stringify(params);

    var options = {
        hostname: 'api.venmo.com',
        path: '/v1/payments?' + params,
        method: 'POST'
    };

    // var payment = https.request(options, function(data) {

    //     var json = '';
    //     data.on('data', function(d) {
    //         json += d;
    //     });

    //     data.on('end', function() {
    //         res.send(json);
    //     });

    //     data.on('error', function() {
    //         console.error(arguments);
    //     });
    // });

    // payment.on('error', function(err) {
    //     console.error(err);
    // });

    // payment.end();
    res.send(params, options);
};