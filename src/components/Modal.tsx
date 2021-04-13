import React, { useContext } from "react";
import clsx from "clsx";

import GameContext from "../context/gameContext";

const Modals: React.FC = () => {
  const context = useContext(GameContext);

  return (
    <div className={clsx("modal")}>
      <div className="modal-inner">
        {context?.gameState.current === "INIT"
          ? "Press the middle button to start"
          : context?.gameState.current === "DEAD"
          ? "The Fox is dead :("
          : ""}
      </div>
    </div>
  );
};

export default Modals;
