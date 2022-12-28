import { BASE, PAPER, ROCK, SCISSORS, ShapeType } from "../shape-types";
import Base from "./base";
import Paper from "./paper";
import Rock from "./rock";
import Scissors from "./scissors";

export const shapeMap = {
  [ROCK]: Rock,
  [PAPER]: Paper,
  [SCISSORS]: Scissors,
  [BASE]: Base,
};

export type shapeKey = keyof typeof shapeMap;