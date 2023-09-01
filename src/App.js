import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(""); // State to store the user input

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const evalResult = evaluateExpression(input);
        setInput(evalResult); // Set the input field to the result
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else if (value === "+/-") {
      if (input.charAt(0) === "-") {
        setInput(input.slice(1));
      } else {
        setInput("-" + input);
      }
    } else {
      setInput(input + value);
    }
  };

  const evaluateExpression = (expression) => {
    // Implement your own expression evaluation logic here
    try {
      return String(eval(expression)); // Using eval for simplicity, replace with safer method
    } catch (error) {
      throw error;
    }
  };

  const options = [
    "C",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="App">
      <div className="container">
        <div className="display">
          <input type="text" value={input} readOnly />
        </div>
        <div className="functions">
          {options.map((value, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(value)}
              className={value === "0" ? "double" : ""}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
