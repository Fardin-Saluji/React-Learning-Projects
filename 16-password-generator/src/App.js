import React from "react";
import PasswordGenerator from "./components/PasswordGenerator";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Password Generator</h1>
      <p>Create a secure and Strong Password, to keep your account Safe</p>
      <PasswordGenerator />
    </div>
  );
}

 
export default App;
