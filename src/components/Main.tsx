import React, { useEffect, useContext } from "react";

import GameContext from "../context/gameContext";
import { TICK_RATE } from "../constants";
import InnerContainer from "./InnerContainer";

const Main: React.FC = () => {
  const context = useContext(GameContext);

  useEffect(() => {
    const interval = setInterval(() => {
      context?.setGameState({
        ...context.gameState,
        clock: context.gameState.clock + 1,
      });
      context?.performFoxActions();
    }, TICK_RATE);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="container">
      <InnerContainer />
    </div>
  );
};

export default Main;
