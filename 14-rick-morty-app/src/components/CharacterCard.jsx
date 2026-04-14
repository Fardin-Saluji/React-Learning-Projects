import React from "react";

function CharacterCard({ character }) {
  return (
    <div className="card" data-testid={`character-${character.id}`}>
      <img src={character.image} alt={character.name} />

      <h3 className="char-name">{character.name}</h3>

      <p
        className="char-status"
        style={{
          color:
            character.status === "Alive"
              ? "green"
              : character.status === "Dead"
              ? "red"
              : "gray",
        }}
      >
        {character.status}
      </p>
       
      <p className="char-species">{character.species}</p>
    </div>
  );
}

export default CharacterCard;
