import * as PIXI from "pixi.js";

import Shape from "./shape";
import { CIRCLE, ShapeType } from "../shape-types";

export default class Circle extends Shape {
  shapeType: ShapeType = CIRCLE;

  protected createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    gr.beginFill(this.color);
    gr.lineStyle(2, 0xfafad2);
    gr.drawCircle(this.width / 2, this.height / 2, this.width / 2);
    gr.endFill();

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    app.stage.addChild(gr);
  }
}
