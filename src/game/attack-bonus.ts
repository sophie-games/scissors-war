import { BASE, PAPER, ROCK, SCISSORS, ShapeType } from "./shape-types";

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
      [BASE]: attack,
    },

    [ROCK]: {
      [PAPER]: reducedAttack,
      [ROCK]: attack,
      [SCISSORS]: amplifiedAttack,
      [BASE]: attack,
    },

    [SCISSORS]: {
      [PAPER]: amplifiedAttack,
      [ROCK]: reducedAttack,
      [SCISSORS]: attack,
      [BASE]: attack,
    },

    [BASE]: {
      [PAPER]: attack,
      [ROCK]: attack,
      [SCISSORS]: attack,
      [BASE]: attack,
    },
  };

  return bonusMap[attackerShapeType][defenderShapeType];
};
