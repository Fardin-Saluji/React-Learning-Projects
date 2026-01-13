import { songs } from "../api/songs";
import SongCard from "../components/SongCard";

export default function Home() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {songs.map(song => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}
