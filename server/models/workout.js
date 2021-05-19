const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  WorkoutNotes: String,
  Sets: { type: Number},
  Period: { type: String},
  Intensity: { type: String},
  kCal: { type: Number },
  date: { type: Date, default: Date.now }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

