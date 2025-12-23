import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import Card from "./Card";

export default function GameBoard() {
  const { cards, setCards, score, setScore, resetGame } = useContext(GameContext);

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  // componentDidMount → reset game
  useEffect(() => {
    resetGame();
  }, []);

  // componentDidUpdate → check after secondCard
  useEffect(() => {
    if (firstCard && secondCard) {
      checkMatch();
    }
  }, [secondCard]);

  const handleCardClick = (clicked) => {
    if (clicked.flipped || secondCard) return;

    setCards((prev) =>
      prev.map((c) =>
        c.id === clicked.id ? { ...c, flipped: true } : c
      )
    );

    firstCard ? setSecondCard(clicked) : setFirstCard(clicked);
  };

  const checkMatch = () => {
    if (firstCard.icon === secondCard.icon) {
      setCards((prev) =>
        prev.map((c) =>
          c.icon === firstCard.icon ? { ...c, matched: true } : c
        )
      );
      setScore((prev) => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, flipped: false }
              : c
          )
        );
        resetTurn();
      }, 800);
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  return (
    <div className="container">
      <h1 className="title">🧠 React Memory Game</h1>
      <h2 className="score">Score: {score}</h2>

      <button className="btn" onClick={resetGame}>🔄 Restart Game</button>

      <div className="grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
