import React, { useEffect, useRef, useState, useCallback } from "react";
import aircraftImg from "../assets/images/aircraft.png";
import birdImg from "../assets/images/bird.gif";
import cloudImg from "../assets/images/cloud.png";
import starImg from "../assets/images/star.png";
import parachuteImg from "../assets/images/parachute-2.png";
import backgroundImage from "../assets/images/background.jpeg";

const Canvas = ({ width, height, isGameStarted, onGameOver }) => {
  // State
  const [paused, setPaused] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [stars, setStars] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const aircraftPositionRef = useRef({ x: 10, y: height / 2 - 50 });
  const gameObjectsRef = useRef({
    birds: [{ x: width, y: Math.random() * (height - 50) }],
    clouds: Array(3)
      .fill()
      .map(() => ({
        x: Math.random() * width,
        y: Math.random() * (height - 50),
      })),
    stars: Array(2)
      .fill()
      .map(() => ({
        x: Math.random() * (width - 20),
        y: Math.random() * height,
      })),
    parachutes: [
      { x: Math.random() * (width - 30), y: Math.random() * height },
    ],
  });
  const imagesRef = useRef({});
  const animationFrameIdRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const birdsRef = useRef([]);
  const zigzagOffsetRef = useRef(0);

  // Helper functions
  const checkCollision = (rect1, rect2) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  // Game logic
  const updateGameState = useCallback(
    (deltaTime) => {
      if (paused || gameOver) return;

      setFuel((prev) => {
        const newFuel = prev - deltaTime;
        if (newFuel <= 0) {
          setGameOver(true);
          return 0;
        }
        return newFuel;
      });

      const { birds, clouds, stars, parachutes } = gameObjectsRef.current;

      // Update birds
      birds.forEach((bird, index) => {
        bird.x -= 120 * deltaTime;
        if (bird.x < -30) {
          bird.x = width;
          bird.y = Math.random() * (height - 50);
        }
        if (birdsRef.current[index]) {
          birdsRef.current[
            index
          ].style.transform = `translate(${bird.x}px, ${bird.y}px)`;
        }
      });

      // Update clouds
      clouds.forEach((cloud) => {
        cloud.x -= 60 * deltaTime;
        if (cloud.x < -100) {
          cloud.x = width;
          cloud.y = Math.random() * (height - 50);
        }
      });

      // Update stars
      stars.forEach((star) => {
        star.y += 90 * deltaTime;
        if (star.y > height) {
          star.x = Math.random() * (width - 20);
          star.y = 0;
        }
      });

      // Update parachutes
      parachutes.forEach((parachute) => {
        parachute.y += 60 * deltaTime;
        const zigzagAmplitude = 30;
        parachute.x +=
          Math.sin(zigzagOffsetRef.current + parachute.y * 0.1) *
          zigzagAmplitude *
          deltaTime;
        parachute.x = Math.max(0, Math.min(width - 30, parachute.x));
        if (parachute.y > height) {
          parachute.x = Math.random() * (width - 30);
          parachute.y = 0;
        }
      });

      checkCollisions();
    },
    [paused, gameOver, width, height]
  );

  const checkCollisions = useCallback(() => {
    const aircraftRect = {
      ...aircraftPositionRef.current,
      width: 180,
      height: 120,
    };
    const { birds, parachutes, stars } = gameObjectsRef.current;

    birds.forEach((bird) => {
      const birdRect = { ...bird, width: 50, height: 50 };
      if (checkCollision(aircraftRect, birdRect)) setGameOver(true);
    });

    parachutes.forEach((parachute, index) => {
      const parachuteRect = { ...parachute, width: 80, height: 80 };
      if (checkCollision(aircraftRect, parachuteRect)) {
        setFuel((prev) => prev + 10);
        parachutes[index] = { x: Math.random() * (width - 30), y: 0 };
      }
    });

    stars.forEach((star, index) => {
      const starRect = { ...star, width: 50, height: 50 };
      if (checkCollision(aircraftRect, starRect)) {
        setStars((prev) => prev + 1);
        setFuel((prev) => prev + 1);
        stars[index] = { x: Math.random() * (width - 20), y: 0 };
      }
    });
  }, [width]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Add this check

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Add this check as well

    const images = imagesRef.current;

    ctx.clearRect(0, 0, width, height);

    if (images.background)
      ctx.drawImage(images.background, 0, 0, width, height);
    if (images.aircraft) {
      const { x, y } = aircraftPositionRef.current;
      ctx.drawImage(images.aircraft, x, y, 180, 120);
    }

    gameObjectsRef.current.clouds.forEach((cloud) => {
      if (images.cloud) ctx.drawImage(images.cloud, cloud.x, cloud.y, 180, 150);
    });

    gameObjectsRef.current.stars.forEach((star) => {
      if (images.star) ctx.drawImage(images.star, star.x, star.y, 50, 50);
    });

    gameObjectsRef.current.parachutes.forEach((parachute) => {
      if (images.parachute)
        ctx.drawImage(images.parachute, parachute.x, parachute.y, 80, 80);
    });
  }, [width, height]);

  const gameLoop = useCallback(
    (timestamp) => {
      if (paused || gameOver) return; // Add gameOver check here

      if (lastUpdateTimeRef.current === 0) {
        lastUpdateTimeRef.current = timestamp;
      }
      const deltaTime = (timestamp - lastUpdateTimeRef.current) / 1000;
      lastUpdateTimeRef.current = timestamp;

      updateGameState(deltaTime);
      drawGame();
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    },
    [updateGameState, drawGame, paused, gameOver]
  );

  const startGameLoop = useCallback(() => {
    if (!animationFrameIdRef.current) {
      lastUpdateTimeRef.current = 0;
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameLoop]);

  const stopGameLoop = useCallback(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);

  const handlePauseResume = useCallback(() => {
    setPaused((prev) => !prev);
  }, []);

  // Effects
  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = {
        aircraft: aircraftImg,
        bird: birdImg,
        cloud: cloudImg,
        star: starImg,
        parachute: parachuteImg,
        background: backgroundImage,
      };
      const loadedImages = {};

      for (const [key, url] of Object.entries(imageUrls)) {
        const img = new Image();
        img.src = url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        loadedImages[key] = img;
      }

      imagesRef.current = loadedImages;
      if (isGameStarted) {
        startGameLoop();
      }
    };

    loadImages();
    return stopGameLoop;
  }, [isGameStarted, startGameLoop, stopGameLoop]);

  useEffect(() => {
    if (paused) {
      stopGameLoop();
    } else {
      startGameLoop();
    }
  }, [paused, startGameLoop, stopGameLoop]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(
          event.key
        )
      ) {
        event.preventDefault();
      }

      if (event.key === " ") {
        handlePauseResume();
      } else if (!paused) {
        const { x, y } = aircraftPositionRef.current;
        aircraftPositionRef.current = {
          x: Math.max(
            0,
            Math.min(
              width - 180,
              x +
                (event.key === "ArrowRight"
                  ? 10
                  : event.key === "ArrowLeft"
                  ? -10
                  : 0)
            )
          ),
          y: Math.max(
            0,
            Math.min(
              height - 120,
              y +
                (event.key === "ArrowDown"
                  ? 10
                  : event.key === "ArrowUp"
                  ? -10
                  : 0)
            )
          ),
        };
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paused, height, width, handlePauseResume]);

  useEffect(() => {
    if (gameOver) {
      stopGameLoop(); // Stop the game loop when game is over
      onGameOver(Math.floor(fuel), stars);
    }
  }, [gameOver, onGameOver, fuel, stars, stopGameLoop]);

  // Render
  return (
    <div
      className="canvas-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        position: "relative",
        borderRadius: "20px",
      }}
    >
      <canvas ref={canvasRef} width={width} height={height} />
      {gameObjectsRef.current.birds.map((bird, index) => (
        <img
          key={index}
          ref={(el) => (birdsRef.current[index] = el)}
          src={birdImg}
          alt="Bird"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50px",
            height: "50px",
            transform: `translate(${bird.x}px, ${bird.y}px)`,
          }}
        />
      ))}
      <div className="game-info">
        <div>Fuel/Time: {Math.ceil(fuel)}</div>
        <div>Stars: {stars}</div>
      </div>
      {paused && (
        <div
          className="pause-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            borderRadius: "20px",
          }}
        >
          <button
            onClick={handlePauseResume}
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Resume
          </button>
        </div>
      )}
      {!paused && (
        <button
          onClick={handlePauseResume}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Pause
        </button>
      )}
    </div>
  );
};

export default Canvas;
