import "./Card.css";

export default function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
      onClick={() => onClick(card)}
    >
      <span className="card-content">
        {card.flipped || card.matched ? card.icon : "?"}
      </span>
    </div>
  );
}
