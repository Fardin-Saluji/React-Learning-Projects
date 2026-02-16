
import { GameProvider } from "./Context/GameContext.jsx";
import GameBoard from "./components/GameBoard";
import "./App.css";

export default function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
}
