var https = require('https');
var qs = require('querystring');
var Device = require('../models/DeviceModel');

exports.getSingleDevice = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    Device.findById(req.params.id, function(err, obj) {
        res.send(obj);
    });
};

exports.getDevices = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

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

exports.putDevice = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    // convert price to number
    req.body.price = Number(req.body.price);
    delete req.body._id;
    var device = Device.findByIdAndUpdate(req.body.id, req.body, function(err) {
        if (err) { return console.error(err); }
        res.send(req.body);
    });
};

exports.postDevice = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    // convert price to number
    req.body.price = Number(req.body.price);
    var device = new Device(req.body);
    device.save(function(err) {
        if (err) { return console.error(err); }
    });
    res.send();
};

exports.payDevice  = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var params = {
        access_token: req.body.access_token,
        user_id: req.body.user_id,
        note: 'test payment',
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