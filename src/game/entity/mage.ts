import * as PIXI from "pixi.js";

import Game from "../game";
import Agent from "./agent";

export default class Mage extends Agent {
  protected createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    // Draw triangle
    gr.beginFill(this.color);
    gr.moveTo(this.width, 0);
    gr.lineTo(this.width / 2, this.height);
    gr.lineTo(0, 0);
    gr.lineTo(this.width / 2, 0);
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
