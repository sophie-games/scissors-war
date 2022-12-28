import Game from "../game";
import Player from ".";
import { PAPER, ROCK, SCISSORS } from "../shape-types";
import { getRandomFromArray } from "../utils";

export default class Ai extends Player {
  think(game: Game) {
    const shapesToSelect = [PAPER, ROCK, SCISSORS];

    const shapeSelected = getRandomFromArray(shapesToSelect);

    const shape = game.createShape(shapeSelected, this.team);

    game.buyShape(shape);
  }
}
