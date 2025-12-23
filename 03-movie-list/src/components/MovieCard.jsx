import "./MovieCard.css";

function MovieCard({ title, year }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>Released in: {year}</p>
    </div>
  );
}

export default MovieCard;
