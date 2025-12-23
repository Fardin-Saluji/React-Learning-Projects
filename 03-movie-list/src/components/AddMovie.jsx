import { useState } from "react";
import "./AddMovie.css";

function AddMovie({ addMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !year) return;

    addMovie(title, year);

    setTitle("");
    setYear("");
  };

  return (
    <form className="add-box" onSubmit={handleSubmit}>
      <button className="add-btn">+ Add Movie</button>

      <input
        type="text"
        placeholder="Movie Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
    </form>
  );
}

export default AddMovie;
