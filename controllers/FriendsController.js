var https = require('https');
var qs = require('querystring');
// var Friend = require('../models/FriendModel');
var Device = require('../models/DeviceModel');

exports.getFriends = function(req, res) {
    var userId = req.query.user_id;
    var accessToken = req.query.access_token;

    res.header("Access-Control-Allow-Origin", "*");

    var friends = https.get('https://api.venmo.com/v1/users/' + userId + '/friends?limit=1000&access_token=' + accessToken, function(data) {
        var json = '';
        data.on('data', function(d) {
            json += d;
        });


        data.on('end', function() {
            res.send(json);
        });
    });

    friends.on('error', console.error);
};

exports.getSingleFriend = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var id = req.params.id.toString();

    var singleFriend = https.get( 'https://api.venmo.com/v1/users/' + id, function(data) {
        var json = '';
        data.on('data', function(d) {
            json += d;
        });

        data.on('end', function() {
            fetchDevices(json);
        });
    });

    singleFriend.on('error', console.error);

    var fetchDevices = function(json) {
        Device.find({ owner: id }, function(err, arr){
            json = JSON.parse(json).data;
            json.devices = arr;
            json = JSON.stringify(json);
            res.send(json);
        });
    };

};

// exports.payFriend = function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*");

//     var userId = req.query.user_id;
//     var accessToken = req.query.access_token;

//     var params = {
//         access_token: accessToken,
//         user_id: userId,
//         note: 'Oh bonjour $$',
//         amount: 0.01,
//         audience: 'public'
//     };

//     params = qs.stringify(params);

//     var options = {
//         hostname: 'api.venmo.com',
//         path: '/v1/payments?' + params,
//         method: 'POST'
//     };

//     var payment = https.request(options, function(data) {

//         var json = '';
//         data.on('data', function(d) {
//             json += d;
//         });

//         data.on('end', function() {
//             res.send(json);
//         });

//         data.on('error', function() {
//             console.error(arguments);
//         });
//     });

//     payment.on('error', function(err) {
//         console.error(err);
//     });

//     payment.end();
// };
