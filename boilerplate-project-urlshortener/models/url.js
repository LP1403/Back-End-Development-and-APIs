const mongo = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: String,
});

const URLModel = mongoose.model('Url', urlSchema);

module.exports = {
  URLModel: URLModel
}