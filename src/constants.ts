//types
type TimerFunction = (clock: number) => number;

export const SCENE_RAIN = "rain";
export const SCENE_DAY = "day";
export const SCENE_NIGHT = "night";
export const SCENE_DEAD = "dead";


export const ICONS = ["fish", "poop", "weather"];
//The number of milliseconds in the browser for one tick
export const TICK_RATE = 2000;
export const RAIN_CHANCE = 0.2;
export const DEFAULT_SCENE = SCENE_DAY;
export const SCENES =  [SCENE_RAIN, SCENE_DAY, SCENE_NIGHT, SCENE_DEAD];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 4;

export const DEAD = "DEAD";
export const SLEEP = "SLEEP";
export const HUNGRY = "HUNGRY";
export const HATCHING = "HATCHING";
export const IDLING = "IDLING";
export const POOPING = "POOPING";
export const CELEBRATING = "CELEBRATING";
export const FEEDING = "FEEDING";
export const INIT = "INIT";

export const foxStates: { [key: string]: string } = {
  IDLING: "idling",
  HATCHING: "egg",
  SLEEP: "sleep",
  CELEBRATING: "celebrate",
  HUNGRY: "hungry",
  FEEDING: "eating",
  DEAD: "dead",
  POOPING: "pooping",
  POOPED: "pooped",
};

export const getNextHungerTime: TimerFunction = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime: TimerFunction = (clock) =>
  Math.floor(Math.random() * 2) + 4 + clock;
export const getNextPoopTime: TimerFunction = (clock) =>
  Math.floor(Math.random() * 3) + 3 + clock;
