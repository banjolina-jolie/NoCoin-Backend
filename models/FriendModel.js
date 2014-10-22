var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
    devices: Array
});

module.exports = mongoose.model('Friend', FriendSchema);
