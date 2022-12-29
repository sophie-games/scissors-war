import * as PIXI from "pixi.js";
import Game from "./game";

interface IUI {
  container: PIXI.Container;
  game: Game;
  width: number;
  height: number;
}

export default class UI {
  gold1: PIXI.Text;
  gold2: PIXI.Text;

  constructor({ container, game, width, height }: IUI) {
    const margin = 80;

    this.gold1 = new PIXI.Text(game.getPlayer(1).gold, {
      fill: "#ffffff",
      fontSize: 32,
      fontWeight: "bold",
    });
    this.gold1.position.x = margin / 2;

    this.gold2 = new PIXI.Text(game.getPlayer(2).gold, {
      fill: "#ffffff",
      fontSize: 32,
      fontWeight: "bold",
      align: "right",
    });
    this.gold2.position.x = width - margin;

    container.addChild(this.gold1);
    container.addChild(this.gold2);
  }

  update(game: Game) {
    this.gold1.text = game.getPlayer(1).gold;
    this.gold2.text = game.getPlayer(2).gold;
  }
}
