import { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";

export default function Player() {
  const { currentSong, isPlaying, setIsPlaying } =
    useContext(PlayerContext);
  const audioRef = useRef();

  useEffect(() => {
    if (currentSong && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong, isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-4 flex items-center gap-4">
      <img src={currentSong.cover} className="w-12 h-12 rounded" />
      <div>
        <p>{currentSong.title}</p>
        <p className="text-sm text-gray-400">{currentSong.artist}</p>
      </div>

      <button
        className="ml-auto bg-green-500 px-4 py-1 rounded"
        onClick={() => {
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current.play();
            setIsPlaying(true);
          }
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <audio ref={audioRef} src={currentSong.src} />
    </div>
  );
}
