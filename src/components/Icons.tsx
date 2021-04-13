import React, { useContext } from "react";
import GameContext from "../context/gameContext";

const Icons: React.FC = () => {
  const context = useContext(GameContext);

  return (
    <div className="icons">
      <div
        className="icon fish-icon"
        onClick={() => context?.handleUserAction("fish")}
      ></div>
      <div
        className="icon poop-icon"
        onClick={() => {
          context?.handleUserAction("poop");
        }}
      ></div>
      <div
        className="icon weather-icon"
        onClick={() => context?.handleUserAction("weather")}
      ></div>
    </div>
  );
};

export default Icons;
