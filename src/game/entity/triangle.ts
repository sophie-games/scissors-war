import * as PIXI from "pixi.js";

import Shape from "./shape";
import { ShapeType, TRIANGLE } from "../shape-types";

export default class Triangle extends Shape {
  shapeType: ShapeType = TRIANGLE;

  protected createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    // Draw triangle
    gr.beginFill(this.color);
    gr.lineStyle(2, 0xfafad2);
    gr.moveTo(this.width, 0);
    gr.lineTo(this.width / 2, this.height);
    gr.lineTo(0, 0);
    gr.lineTo(this.width / 2, 0);
    gr.lineTo(this.width, 0);
    gr.endFill();

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    app.stage.addChild(gr);
  }
}
