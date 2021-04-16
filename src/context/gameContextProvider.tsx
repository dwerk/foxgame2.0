import React from "react";

import {
  getNextHungerTime,
  getNextDieTime,
  DEAD,
  NIGHT_LENGTH,
  DAY_LENGTH,
  RAIN_CHANCE,
  getNextPoopTime,
  HATCHING,
  IDLING,
  CELEBRATING,
  POOPING,
  HUNGRY,
  FEEDING,
  SLEEP,
  SCENE_RAIN,
  SCENE_DAY,
  SCENE_NIGHT,
  SCENE_DEAD,
} from "../constants";
import { GameStateType } from "../types";
import GameContext from "./gameContext";

interface GameContextProviderProps {
  children: React.ReactNode;
}

const GameContextProvider: React.FC<GameContextProviderProps> = (props) => {
  const initialState = {
    current: "INIT",
    clock: 1,
    wakeTime: -1,
    sleepTime: -1,
    hungryTime: -1,
    dieTime: -1,
    poopTime: -1,
    timeToStartCelebrating: -1,
    timeToEndCelebrating: -1,
    scene: SCENE_DAY,
  };

  const [gameState, setGameState] = React.useState<GameStateType>(initialState);
  const [cleaning, setCleaning] = React.useState<boolean>(false);

  const startGame = () => {
    setGameState({
      ...initialState,
      current: HATCHING,
      wakeTime: initialState.clock + 3,
      scene: SCENE_DAY,
    });
  };

  const wake = () => {
    setGameState({
      ...gameState,
      current: IDLING,
      wakeTime: -1,
      sleepTime: gameState.clock + DAY_LENGTH,
      hungryTime: getNextHungerTime(gameState.clock),
      scene: Math.random() > RAIN_CHANCE ? SCENE_RAIN : SCENE_DAY,
    });
  };

  const changeWeather = () => {
    setGameState({
      ...gameState,
      scene: gameState.scene === SCENE_RAIN ? SCENE_DAY : gameState.scene === SCENE_DAY ? SCENE_RAIN : SCENE_RAIN,
    });
  };

  const startCelebrating = () => {
    setGameState({
      ...gameState,
      current: CELEBRATING,
      timeToStartCelebrating: -1,
      timeToEndCelebrating: gameState.clock + 2,
    });
    setCleaning(false);
  };

  const endCelebrating = () => {
    setGameState({ ...gameState, current: IDLING, timeToEndCelebrating: -1 });
  };

  const cleanUpPoop = () => {
    if (gameState.current !== POOPING) {
      return;
    }
    setGameState({
      ...gameState,
      dieTime: -1,
      timeToStartCelebrating: gameState.clock + 2,
      hungryTime: getNextHungerTime(gameState.clock),
    });
    setCleaning(true);
  };

  const poop = () => {
    setGameState({
      ...gameState,
      current: POOPING,
      poopTime: -1,
      dieTime: getNextDieTime(gameState.clock),
    });
  };

  const feed = () => {
    // can only feed when hungry
    if (gameState.current !== HUNGRY) {
      return;
    }
    setGameState({
      ...gameState,
      current: FEEDING,
      dieTime: -1,
      poopTime: getNextPoopTime(gameState.clock),
      timeToStartCelebrating: gameState.clock + 2,
    });
  };

  const die = () => {
    setGameState({
      ...gameState,
      current: DEAD,
      scene: SCENE_DEAD,
      sleepTime: -1,
      hungryTime: -1,
      dieTime: -1,
      poopTime: -1,
      timeToStartCelebrating: -1,
      timeToEndCelebrating: -1,
    });
  };

  const getHungry = () => {
    setGameState({
      ...gameState,
      current: HUNGRY,
      dieTime: getNextDieTime(gameState.clock),
      hungryTime: -1,
    });
  };

  const sleep = () => {
    setGameState({
      ...gameState,
      scene: SCENE_NIGHT,
      current: SLEEP,
      wakeTime: gameState.clock + NIGHT_LENGTH,
      sleepTime: -1,
      hungryTime: -1,
      dieTime: -1,
      poopTime: -1,
      timeToStartCelebrating: -1,
      timeToEndCelebrating: -1,
    });
  };

  const handleUserAction = (actionType: string) => {
    // can't do actions while in these states
    if ([SLEEP, FEEDING, CELEBRATING, HATCHING].includes(gameState.current)) {
      // do nothing
      return;
    }

    if (gameState.current === "INIT" || gameState.current === DEAD) {
      startGame();
      return;
    }

    // execute the currently selected action
    switch (actionType) {
      case "weather":
        changeWeather();
        break;
      case "poop":
        cleanUpPoop();
        break;
      case "fish":
        feed();
        break;
    }
  };

  const performFoxActions = () => {
    if (gameState.clock === gameState.wakeTime) {
      wake();
    } else if (gameState.clock === gameState.sleepTime) {
      sleep();
    } else if (gameState.clock === gameState.hungryTime) {
      getHungry();
    } else if (gameState.clock === gameState.timeToStartCelebrating) {
      startCelebrating();
    } else if (gameState.clock === gameState.timeToEndCelebrating) {
      endCelebrating();
    } else if (gameState.clock === gameState.poopTime) {
      poop();
    } else if (gameState.clock === gameState.dieTime) {
      die();
    }
  };

  return (
    <GameContext.Provider
      value={{
        startGame,
        handleUserAction,
        setGameState,
        gameState,
        performFoxActions,
        cleaning,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
