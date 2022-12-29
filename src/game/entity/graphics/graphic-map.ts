import { BASE, PAPER, ROCK, SCISSORS } from "../../shape-types";
import GrSprite from "./sprite";

export const graphicMap = {
  [ROCK]: GrSprite,
  [PAPER]: GrSprite,
  [SCISSORS]: GrSprite,
  [BASE]: GrSprite,
};

export type graphicKey = keyof typeof graphicMap;