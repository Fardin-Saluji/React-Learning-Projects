import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayerContext.Provider
      value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
