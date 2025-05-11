import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RulesScreen from "./RulesScreen"; 

const colors = ["green", "red", "yellow", "purple"];

const SimonGame = () => {
  const [showRules, setShowRules] = useState(true);
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [level, setLevel] = useState(0);
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState("Press any key to start");

  useEffect(() => {
    const handleKeyPress = () => {
      if (!started && !showRules) {
        setStarted(true);
        setLevel(1);
        setMessage(`Level 1`);
        nextSequence([]);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [started, showRules]);

  const flash = (color) => {
    const btn = document.getElementById(color);
    if (!btn) return;
    btn.classList.add("ring-4", "ring-white");
    setTimeout(() => {
      btn.classList.remove("ring-4", "ring-white");
    }, 300);
  };

  const nextSequence = (currentSeq) => {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    const newSeq = [...currentSeq, randomColor];
    setGameSeq(newSeq);
    setUserSeq([]);
    setTimeout(() => flash(randomColor), 500);
    setMessage(`Level ${newSeq.length}`);
  };

  const handleUserClick = (color) => {
    if (!started) return;
    const newUserSeq = [...userSeq, color];
    setUserSeq(newUserSeq);
    flash(color);

    if (color !== gameSeq[newUserSeq.length - 1]) {
      setMessage(`Game Over! Score: ${level - 1}. Press any key to restart`);
      setGameSeq([]);
      setUserSeq([]);
      setLevel(0);
      setStarted(false);
      return;
    }

    if (newUserSeq.length === gameSeq.length) {
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        nextSequence(gameSeq);
      }, 1000);
    }
  };

  if (showRules) return <RulesScreen onStart={() => setShowRules(false)} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4 text-white"
    >
      {/* Animated Game Title with Text Shadow and Hover Effect */}
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold mb-4 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.1, color: "#ff6347" }} // Change color on hover
      >
        Simon Says Game
      </motion.h1>

      {/* Animated Message Text with Scaling and Opacity Effects */}
      <motion.h3
        className="text-lg sm:text-xl mb-4 text-center text-shadow-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileTap={{ scale: 0.95 }}
      >
        {message}
      </motion.h3>

      <motion.div
        className="grid grid-cols-2 gap-2 max-w-xs sm:max-w-md w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {colors.map((color) => (
          <motion.button
            key={color}
            id={color}
            onClick={() => handleUserClick(color)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`h-32 sm:h-40 rounded-xl shadow-lg transition-transform duration-300 ${
              color === "green"
                ? "bg-green-500"
                : color === "red"
                ? "bg-red-500"
                : color === "yellow"
                ? "bg-yellow-400"
                : "bg-purple-500"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SimonGame;
