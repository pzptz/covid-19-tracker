import React from "react";
import "./App.css";

function App() {

  const showJack = (str) => {
    let jack = "jack";
    console.log(str);
  };

  return (
    <div className="App">
      <h1>{showJack("hi")}</h1>
    </div>
  );
}

export default App;
