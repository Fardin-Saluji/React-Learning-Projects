import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PlayerProvider } from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PlayerProvider>
    <App />
  </PlayerProvider>
);
