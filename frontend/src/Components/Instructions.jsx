const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2>Game Instructions</h2>
      <ul>
        <li>
          <strong>Start the Game:</strong> Click the “Start Game” button to
          begin. The aircraft will start moving, and the timer will start
          counting down. You have 10 seconds of fuel to fly!
        </li>
        <li>
          <strong>Control the Aircraft:</strong> Use the{" "}
          <strong>Arrow Keys</strong> to move the aircraft:
          <ul>
            <li>
              <strong>Left/Right:</strong> Move left or right.
            </li>
            <li>
              <strong>Up/Down:</strong> Move up or down.
            </li>
            <li>Stay within the screen boundaries!</li>
          </ul>
        </li>
        <li>
          <strong>Avoid Obstacles:</strong> Watch out for birds flying across
          the screen! Avoid colliding with them to keep the game going.
        </li>
        <li>
          <strong>Collect Items:</strong> Pick up parachutes and stars to boost
          your score:
          <ul>
            <li>
              <strong>Parachutes:</strong> add 10 seconds of fuel.
            </li>
            <li>
              <strong>Stars:</strong> increase your score by 1 point.
            </li>
          </ul>
        </li>
        <li>
          <strong>Pause and Resume:</strong> Press the{" "}
          <strong>Space Bar</strong> or click the <strong>Pause Button</strong>{" "}
          to pause the game. Press again to resume.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
