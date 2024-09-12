import { useState } from "react";
import Canvas from "./Components/Canvas";
import GameOver from "./Components/GameOver";
import Instructions from "./Components/Instructions";
import "./App.css";

const App = () => {
  const [gameState, setGameState] = useState("instructions"); // "instructions", "playing", or "over"
  const [time, setTime] = useState(0);
  const [stars, setStars] = useState(0);

  const handleStartGame = () => {
    setGameState("playing");
  };

  const handleGameOver = (finalTime, finalStars) => {
    setTime(finalTime);
    setStars(finalStars);
    setGameState("over");
  };

  const handleRestart = () => {
    setGameState("instructions");
    setTime(0);
    setStars(0);
  };

  return (
    <div className="app-container">
      <div className="game-container">
        {gameState !== "playing" && <h1 className="game-title">Sky Angel</h1>}

        {gameState === "instructions" && (
          <div className="game-details">
            <Instructions />
            <button className="start-button" onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <Canvas
            width={1024}
            height={768}
            isGameStarted={true}
            onGameOver={handleGameOver}
          />
        )}

        {gameState === "over" && (
          <GameOver time={time} stars={stars} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default App;
