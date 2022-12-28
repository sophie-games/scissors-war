import Game from "../game";
import Player from ".";

export default class Ai extends Player {
  think(game: Game) {
    const shape = game.createTriangle({
      position: this.startPosition.clone(),
      team: this.team,
    });

    game.buyShape(shape);
  }
}
