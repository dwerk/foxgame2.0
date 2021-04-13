export interface GameStateType {
  current: string;
  clock: number;
  wakeTime: number;
  sleepTime: number;
  hungryTime: number;
  dieTime: number;
  poopTime: number;
  timeToStartCelebrating: number;
  timeToEndCelebrating: number;
  scene: number;
}
