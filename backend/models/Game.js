const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = {
  Game,
};
