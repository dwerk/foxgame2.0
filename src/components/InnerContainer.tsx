import React, { useContext } from "react";
import clsx from "clsx";

import GameContext from "../context/gameContext";
import { INIT, POOPING, SCENE_RAIN, SCENE_DAY, foxStates } from "../constants";
import { GameStateType } from "../types"
import Buttons from "./Buttons";
import Icons from "./Icons";
import Modal from "./Modal";
;

const InnerContainer = () => {
  const context = useContext(GameContext);

  const show = context?.cleaning && context?.gameState.current === "POOPING";

  // const returnFoxClass = (): string => {
  //   return context?.gameState.current === "INIT"
  //     ? "hidden"
  //     : show
  //     ? "fox-pooped"
  //     : `fox-${foxStates[context?.gameState.current || ""]} ${
  //         context?.gameState.scene === 1 && "fox-rain"
  //       }`;
  // };
const getFoxClass = (gameState?: GameStateType ) => clsx('fox', `fox-${foxStates[gameState?.current || ""]}`, {
  'hidden': gameState?.current === INIT,
  'fox-pooped': gameState?.current === POOPING,
  'fox-rain': gameState?.scene === SCENE_RAIN
})

const gameClassNames = (gameState?: GameStateType) => clsx('game', gameState?.scene || SCENE_DAY)


  return (
    <div className="inner">
      <div className={gameClassNames(context?.gameState)}></div>
      <div className={getFoxClass(context?.gameState)}></div>
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
