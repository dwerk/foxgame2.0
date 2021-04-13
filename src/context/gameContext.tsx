import React from "react";
import { createContext } from "react";
import { GameStateType } from "../types";

interface GameContextType {
  startGame: () => void;
  handleUserAction: (actionType: string) => void;
  setGameState: React.Dispatch<React.SetStateAction<GameStateType>>;
  gameState: GameStateType;
  performFoxActions: () => void;
  cleaning: boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export default GameContext;
