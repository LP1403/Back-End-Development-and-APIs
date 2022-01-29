
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: {type: String, required: false}
});

const ExerciseModel = mongoose.model('Excercise', exerciseSchema);

module.exports = {
  ExerciseModel: ExerciseModel
}