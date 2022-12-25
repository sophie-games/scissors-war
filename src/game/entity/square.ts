import * as PIXI from "pixi.js";

import Shape from "./shape";
import { ShapeType, SQUARE } from "../shape-types";

export default class Square extends Shape {
  shapeType: ShapeType = SQUARE;

  protected createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    gr.beginFill(this.color);
    gr.lineStyle(2, 0xfafad2);
    gr.drawRect(0, 0, this.width, this.height);
    gr.endFill();

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    app.stage.addChild(gr);
  }
}
