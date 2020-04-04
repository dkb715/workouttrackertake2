
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

  day: {
    type: Date,
    default: () => new Date()
  },
  exercises: [{
    type: {
      type: String,
      trim: true
    },

    name: {
      type: String,
      trim: true,
      required: 'exercise must have a name'
    },

    duration: {
      type: Number
    },

    weight: {
      type: Number
    },
    reps: {
      type: Number
    },
    sets: {
      type: Number
    },
    distance:{
      type: Number
    },
    
  }],
  

  });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
