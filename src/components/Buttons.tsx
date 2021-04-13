import React, { useContext } from "react";

import GameContext from "../context/gameContext";

const Buttons: React.FC = () => {
  const gameContext = useContext(GameContext);

  return (
    <div className="buttons">
      <button className="btn left-btn"></button>
      <button
        className="btn middle-btn"
        onClick={gameContext?.startGame}
      ></button>
      <button className="btn right-btn"></button>
    </div>
  );
};

export default Buttons;
