const API_URL = "http://localhost:5000/api";
export const saveGame = async (playerName, score, time) => {
  try {
    const response = await fetch(`${API_URL}/game/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName, score, time }),
    });
    return response.json();
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};

export const getHighScores = async () => {
  try {
    const response = await fetch(`${API_URL}/game/highscores`);
    return response.json();
  } catch (error) {
    console.error("Error fetching high scores:", error);
    throw error;
  }
};
