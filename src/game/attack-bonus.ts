import { CIRCLE, ShapeType, SQUARE, TRIANGLE, UNDEFINED } from "./shape-types";

export const attackBonus = (
  attackerShapeType: ShapeType,
  defenderShapeType: ShapeType,
  attack: number
): number => {
  const amplifiedAttack = attack * 2;
  const reducedAttack = attack / 2;

  const bonusMap: any = {
    [CIRCLE]: {
      [CIRCLE]: attack,
      [TRIANGLE]: amplifiedAttack,
      [SQUARE]: reducedAttack,
      [UNDEFINED]: attack
    },

    [TRIANGLE]: {
      [CIRCLE]: reducedAttack,
      [TRIANGLE]: attack,
      [SQUARE]: amplifiedAttack,
      [UNDEFINED]: attack
    },

    [SQUARE]: {
      [CIRCLE]: amplifiedAttack,
      [TRIANGLE]: reducedAttack,
      [SQUARE]: attack,
      [UNDEFINED]: attack
    },

    [UNDEFINED]: {
      [CIRCLE]: attack,
      [TRIANGLE]: attack,
      [SQUARE]: attack,
      [UNDEFINED]: attack
    }
  };

  return bonusMap[attackerShapeType][defenderShapeType];
};
