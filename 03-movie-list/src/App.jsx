import { useState } from "react";
import MovieCard from "./components/MovieCard";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "Interstellar", year: 2014 }
  ]);

  const addMovie = (title, year) => {
    const newMovie = {
      id: movies.length + 1,
      title,
      year
    };
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="app">
      <h1 className="title">🎬 Movie List</h1>

      <AddMovie addMovie={addMovie} />

      {movies.map((m) => (
        <MovieCard key={m.id} title={m.title} year={m.year} />
      ))}
    </div>
  );
}

export default App;
