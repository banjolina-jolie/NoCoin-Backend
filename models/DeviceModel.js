var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
    name: String,
    owner: String,
    price: Number
});

module.exports = mongoose.model('Device', DeviceSchema);
