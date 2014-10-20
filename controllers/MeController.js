var https = require('https');

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
            res.send(json);
        });
    });
};
