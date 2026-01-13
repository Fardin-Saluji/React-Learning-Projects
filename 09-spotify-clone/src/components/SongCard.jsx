import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export default function SongCard({ song }) {
  const { setCurrentSong, setIsPlaying } = useContext(PlayerContext);

  return (
    <div
      className="bg-zinc-900 p-4 rounded hover:bg-zinc-800 cursor-pointer"
      onClick={() => {
        setCurrentSong(song);
        setIsPlaying(true);
      }}
    >
      <img src={song.cover} className="rounded mb-2" />
      <h3 className="font-bold">{song.title}</h3>
      <p className="text-sm text-gray-400">{song.artist}</p>
    </div>
  );
}
