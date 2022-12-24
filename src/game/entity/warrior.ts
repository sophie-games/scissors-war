import * as PIXI from "pixi.js";

import Game from "../game";
import Agent from "./agent";

export default class Warrior extends Agent {
  protected createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    gr.beginFill(this.color);
    gr.drawCircle(30, 30, this.width / 2);
    gr.endFill();

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    app.stage.addChild(gr);
  }

  public think(game: Game) {
    const closerEnemy = game.getTheCloserEnemyOfAgent(this);

    if (!closerEnemy) return;

    game.moveAgentTo(this, closerEnemy.position.x, closerEnemy.position.y);

    const distance = this.position.getDistance(closerEnemy.position);

    if (distance > this.width + 10) return;

    closerEnemy.hurt(this.attack);
    closerEnemy.updateHpBar();
  }
}
