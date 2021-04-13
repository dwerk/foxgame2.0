import React from "react";
import Main from "./components/Main";
import GameContextProvider from "./context/gameContextProvider";
import "./App.css";
import "./sprites.css";

function App() {
  return (
    <div>
      <GameContextProvider>
        <Main />
      </GameContextProvider>
    </div>
  );
}

export default App;
