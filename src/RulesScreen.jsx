import React from "react";
import { motion } from "framer-motion";

const RulesScreen = ({ onStart }) => {
  return (
    <motion.div
      className="rules-container h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onStart} // Trigger start on click
    >
      <motion.h1
        className="text-4xl font-extrabold mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Simon Says!
      </motion.h1>

      <motion.ul
        className="text-lg space-y-4 max-w-xl"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          "Press any key to start the game.",
          "Watch the color pattern shown on the screen.",
          "Repeat the exact pattern by clicking the colored buttons in order.",
          "Each level adds one more color to the sequence.",
          "Make a mistake, and it's game over!",
          "Press any key to restart after a game over.",
        ].map((rule, index) => (
          <motion.li
            key={index}
            className="bg-gray-700 bg-opacity-30 p-3 rounded-md shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {rule}
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        className="mt-8 text-sm italic text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Click anywhere to begin!
      </motion.p>
    </motion.div>
  );
};

export default RulesScreen;
