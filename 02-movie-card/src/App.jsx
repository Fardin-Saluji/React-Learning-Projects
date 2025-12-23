import React from "react";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <MovieCard
        title="Inception"
        description="A mind-bending sci-fi thriller by Christopher Nolan."
        image="https://tse2.mm.bing.net/th/id/OIP.fdrqwltbVibBR-irFTm1ZgHaEK?pid=Api&P=0&h=180"
        rating={8.8}
      />
    </div>
  );
}

export default App;
