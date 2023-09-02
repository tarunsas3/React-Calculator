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
    try {
      // Custom expression evaluation for basic arithmetic operations
      const result = evalBasicExpression(expression);
      return String(result);
    } catch (error) {
      throw error;
    }
  };

  const evalBasicExpression = (expression) => {
    // Define basic arithmetic operations
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    const tokens = expression.match(/(\d+\.?\d*|\+|-|\*|\/)/g);

    if (!tokens) {
      throw new Error("Invalid expression");
    }

    let stack = [];
    let currentOperator = null;

    for (const token of tokens) {
      if (operators[token]) {
        currentOperator = token;
      } else {
        const operand = parseFloat(token);
        if (!isNaN(operand)) {
          if (currentOperator) {
            const previousOperand = stack.pop();
            stack.push(operators[currentOperator](previousOperand, operand));
            currentOperator = null;
          } else {
            stack.push(operand);
          }
        } else {
          throw new Error("Invalid token: " + token);
        }
      }
    }

    if (stack.length === 1) {
      return stack[0];
    } else {
      throw new Error("Invalid expression");
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
