import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SimonGame from "./SimonGame"; // The game component that includes RulesScreen

const App = () => {
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <motion.div
          key="simon-game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SimonGame />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
