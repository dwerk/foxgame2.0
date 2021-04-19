import React, { useContext } from "react";
import clsx from "clsx";

import GameContext from "../context/gameContext";
import { foxStates, INIT, POOPING, SCENE_DAY, SCENE_RAIN } from "../constants";
import Buttons from "./Buttons";
import Icons from "./Icons";
import Modal from "./Modal";
import { GameStateType } from "../types";

type GameClassNameFn = (gameState?: GameStateType) => string;

const bagClassNames : GameClassNameFn = (gameState) => clsx(gameState?.cleaning && gameState?.current === "POOPED" ? "poop-bag" : "")

const foxClassNames : GameClassNameFn = (gameState) => clsx('fox', `fox-${foxStates[gameState?.current || ""]}`, {
  'hidden': gameState?.current === INIT,
  'fox-pooped': gameState?.current === POOPING,
  'fox-rain': gameState?.scene === SCENE_RAIN
})

const gameClassNames : GameClassNameFn = (gameState) => clsx('game', gameState?.scene || SCENE_DAY)

const InnerContainer = () => {
  const context = useContext(GameContext);

  return (
    <div className="inner">
      <div className={gameClassNames(context?.gameState)}></div>
      <div className={foxClassNames(context?.gameState)}></div>
      <div className={bagClassNames(context?.gameState)}></div>
      <div className="foreground-rain"></div>
      <div className="frame"></div>
      <Modal />
      <Buttons />
      <Icons />
    </div>
  );
};

export default InnerContainer;
