import { PAPER, ROCK, SCISSORS, ShapeType, UNDEFINED } from "./shape-types";

export const attackBonus = (
  attackerShapeType: ShapeType,
  defenderShapeType: ShapeType,
  attack: number
): number => {
  const amplifiedAttack = attack * 2;
  const reducedAttack = attack / 2;

  const bonusMap: any = {
    [PAPER]: {
      [PAPER]: attack,
      [ROCK]: amplifiedAttack,
      [SCISSORS]: reducedAttack,
      [UNDEFINED]: attack,
    },

    [ROCK]: {
      [PAPER]: reducedAttack,
      [ROCK]: attack,
      [SCISSORS]: amplifiedAttack,
      [UNDEFINED]: attack,
    },

    [SCISSORS]: {
      [PAPER]: amplifiedAttack,
      [ROCK]: reducedAttack,
      [SCISSORS]: attack,
      [UNDEFINED]: attack,
    },

    [UNDEFINED]: {
      [PAPER]: attack,
      [ROCK]: attack,
      [SCISSORS]: attack,
      [UNDEFINED]: attack,
    },
  };

  return bonusMap[attackerShapeType][defenderShapeType];
};
