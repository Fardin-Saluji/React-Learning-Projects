import React, { useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()";

  const generatePassword = () => {
    setError("");

    
    if (length === 0) {
      setError("Length cannot be Empty or 0");
      return;
    }
    

    if (length > 20) {
      setError("Max length is 20");
      return;
    }

    if (!lower && !upper && !number && !symbol) {
      setError("Select at least one option");
      return;
    }

    let chars = "";
    if (lower) chars += lowerChars;
    if (upper) chars += upperChars;
    if (number) chars += numberChars;
    if (symbol) chars += symbolChars;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(generated);
  };

  return (
    <div className="container">
      <h2>Password Length</h2>

      <input
        type="number"
        value={length}
        data-testid="length-input"
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <div className="checkboxes">
        <label>
          <input
            type="checkbox"
            data-testid="lowercase-checkbox"
            checked={lower}
            onChange={() => setLower(!lower)}
          />
          Include LowerCase
        </label>
        
        <label>
          <input
            type="checkbox"
            data-testid="uppercase-checkbox"
            checked={upper}
            onChange={() => setUpper(!upper)}
          />
          Include UpperCase
        </label>

        <label>
          <input
            type="checkbox"
            data-testid="number-checkbox"
            checked={number}
            onChange={() => setNumber(!number)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            data-testid="symbols-checkbox"
            checked={symbol}
            onChange={() => setSymbol(!symbol)}
          />
          Include Symbols
        </label>
      </div>
      <button data-testid="generate-button" onClick={generatePassword}>
        Generate
      </button>

      <h3 data-testid="result">{password}</h3>

      {error && (
        <p data-testid="error-message" className="error">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordGenerator;
