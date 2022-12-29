import * as PIXI from "pixi.js";
import GrSprite from "./sprite";

export default class GrCircle extends GrSprite {

  createGraphic(app: PIXI.Application) {
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
