import Game from "../game";
import Player from ".";
import { BASE, PAPER, ROCK, SCISSORS } from "../shape-types";
import { getRandomFromArray } from "../utils";

export default class Ai extends Player {
  think(game: Game) {
    const shape = game.createShape(this.getShapeToBuy(game), this.team);

    if (!shape) return;

    game.buyShape(shape);
  }

  getShapeToBuy(game: Game) {
    const enemyShapesMap: any = {};
    game.shapes.forEach((shape) => {
      if (shape.team === this.team) return;

      if (enemyShapesMap[shape.shapeType]) {
        enemyShapesMap[shape.shapeType]++;
      } else {
        enemyShapesMap[shape.shapeType] = 1;
      }
    });

    const mostShapeUsedByEnemy = Object.keys(enemyShapesMap).reduce((a, b) =>
      enemyShapesMap[a] > enemyShapesMap[b] ? a : b
    );

    const obj: any = {
      [ROCK]: PAPER,
      [PAPER]: SCISSORS,
      [SCISSORS]: ROCK,
      [BASE]: getRandomFromArray([PAPER, ROCK, SCISSORS]),
    };

    return obj[mostShapeUsedByEnemy];
  }
}
