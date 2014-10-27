var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    venmo_id: String,
    access_token: String,
    devices: Array
});

module.exports = mongoose.model('User', UserSchema);
