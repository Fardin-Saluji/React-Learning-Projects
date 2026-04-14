import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import Controls from "./components/Controls";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    let data = [...characters];

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      data = data.filter((c) => c.status === status);
    }
    
    data.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return data;
  }, [characters, search, status, sortOrder]);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error-message">{error}</p>;
  
  return (
    <div className="container">
      <h1>Rick And Morty Characters</h1>

      <Controls
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="grid">
        {filteredData.length === 0 ? (
          <p>No Characters Found</p>
        ) : (
          filteredData.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
