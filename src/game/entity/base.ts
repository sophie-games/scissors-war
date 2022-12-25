import * as PIXI from "pixi.js";

import Shape from "./shape";

export default class Base extends Shape {
  width = 100;
  height = 100;

  maxHp = 2000;
  hp = 2000;
  attack = 1;
  speed = 0;
  gold = 0;

  shapeIgnoredByAllies = true;

  protected createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    gr.beginFill(this.color);
    gr.lineStyle(2, 0xfafad2);
    gr.drawCircle(0, 0, this.width / 2);
    gr.endFill();

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    app.stage.addChild(gr);
  }
}
