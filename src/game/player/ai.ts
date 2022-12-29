import Game from "../game";
import Player from ".";
import { PAPER, ROCK, SCISSORS } from "../shape-types";
import { getRandomFromArray } from "../utils";

export default class Ai extends Player {
  think(game: Game) {
    const shape = game.createShape(this.getShapeToBuy(game), this.team);
    game.buyShape(shape);
  }

  getShapeToBuy(game: Game) {
    const shapesToSelect = [PAPER, ROCK, SCISSORS];

    const randomShape = getRandomFromArray(shapesToSelect);

    const enemyShapesMap: any = {};
    game.shapes.forEach((shape) => {
      if (shape.team === this.team) return;

      if (enemyShapesMap[shape.shapeType]) {
        enemyShapesMap[shape.shapeType]++;
      } else {
        enemyShapesMap[shape.shapeType] = 1;
      }
    });

    return randomShape;
  }
}
