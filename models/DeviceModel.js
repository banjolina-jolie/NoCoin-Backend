var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  owner   : String
});

module.exports = mongoose.model('Device', DeviceSchema);
