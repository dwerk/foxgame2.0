import React, { useContext } from "react";
import clsx from "clsx";

import GameContext from "../context/gameContext";
import { SCENES, foxStates } from "../constants";
import Buttons from "./Buttons";
import Icons from "./Icons";
import Modal from "./Modal";

const InnerContainer = () => {
  const context = useContext(GameContext);

  const show = context?.cleaning && context?.gameState.current === "POOPING";

  const returnFoxClass = (): string => {
    return context?.gameState.current === "INIT"
      ? "hidden"
      : show
      ? "fox-pooped"
      : `fox-${foxStates[context?.gameState.current || ""]} ${
          context?.gameState.scene === 1 && "fox-rain"
        }`;
  };

  const returnSceneClass = (): string => {
    return SCENES[context?.gameState.scene || 0];
  };

  return (
    <div className="inner">
      <div className={clsx("game", returnSceneClass())}></div>
      <div className={clsx("fox", returnFoxClass())}></div>
      <div className={clsx("poop-bag", `${!show && "hidden"}`)}></div>
      <div className="foreground-rain"></div>
      <div className="frame"></div>
      <Modal />
      <Buttons />
      <Icons />
    </div>
  );
};

export default InnerContainer;
