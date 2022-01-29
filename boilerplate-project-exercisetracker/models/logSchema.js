
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const logSchema = new Schema({
  username: String,
  count: Number,
  log:  [{
    description: String,
    duration: Number,
    date: String
  }]
});

const LogModel = mongoose.model('Log', logSchema);

module.exports = {
  LogModel: LogModel
}