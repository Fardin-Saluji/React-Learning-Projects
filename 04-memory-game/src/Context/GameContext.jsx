import { createContext, useState } from "react";
import { generateShuffledCards } from "../utils/shuffleCards";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [cards, setCards] = useState(generateShuffledCards());
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setCards(generateShuffledCards());
    setScore(0);
  };

  return (
    <GameContext.Provider value={{ cards, setCards, score, setScore, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};
