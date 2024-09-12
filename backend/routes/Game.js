const express = require("express");
const router = express.Router();
const { Game } = require("../models/Game");

router.post("/save", async (req, res) => {
  try {
    const { playerName, score, time } = req.body;
    const newGame = await Game.create({
      playerName,
      score,
      time,
    });
    // const newGame = new Game({ playerName, score, time });
    // await newGame.save();
    res.status(200).json({
      message: "new game score successfully created!",
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
});

router.get("/highscores", async (req, res) => {
  try {
    const highScores = await Game.find().sort({ score: -1 }).limit(10);
    res.json(highScores);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
});

module.exports = router;
