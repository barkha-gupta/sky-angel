import React, { useState } from "react";
import { saveGame, getHighScores } from "../api";

const GameOver = ({ time, stars, onRestart }) => {
  const [playerName, setPlayerName] = useState("");
  const [highScores, setHighScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await saveGame(playerName, stars, time);
      const scores = await getHighScores();

      setHighScores(scores);
    } catch (error) {
      setError("Failed to save score or fetch high scores");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Saving score and fetching high scores...</div>;
  if (error) return <div>{error}</div>;

  if (highScores) {
    return (
      <div className="high-scores-container">
        <h2>High Scores</h2>
        <ul>
          {highScores.map((score, index) => (
            <li key={score._id}>
              {index + 1}. {score.playerName} - Stars: {score.score}, Time:{" "}
              {score.time}
            </li>
          ))}
        </ul>
        <button onClick={onRestart}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <p>Time Survived: {time} seconds</p>
      <p>Stars Collected: {stars}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Save Score</button>
      </form>
    </div>
  );
};

export default GameOver;
