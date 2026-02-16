
import { GameProvider } from "./Context/GameContext";
import GameBoard from "./components/GameBoard";
import "./App.css";

export default function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
}
