export const SINGLE_PLAYER = "single-player";
export const TWO_PLAYERS = "two-players";

export type GameMode =
  | typeof SINGLE_PLAYER
  | typeof TWO_PLAYERS;
