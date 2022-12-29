import * as PIXI from "pixi.js";
import textures from "../../textures";
import Shape from "../shape";
import Vector2D from "../../vector-2d";

const HP_BAR_WIDTH = 56;
const HP_BAR_HEIGHT = 10;

export default class GrSprite extends Shape {
  protected gr = new PIXI.Graphics();
  private hpBar?: PIXI.Graphics;

  get color() {
    return this.team === 1 ? 0x0096ff : 0xee4b2b;
  }

  init(app: PIXI.Application, shape: Shape) {
    this.maxHp = shape.maxHp;
    this.hp = shape.hp;
    this.width = shape.width;
    this.height = shape.height;
    this.shapeType = shape.shapeType;

    this.createGraphic(app);
    this.createHpBar();
  }

  protected createHpBar() {
    const maxHp = new PIXI.Graphics();
    maxHp.beginFill(0x4a0707);
    maxHp.drawRect(0, 0, HP_BAR_WIDTH, HP_BAR_HEIGHT);
    maxHp.endFill();

    maxHp.position.x = -HP_BAR_WIDTH / 2;
    maxHp.position.y = -this.gr.height / 2 - 24;

    const hp = new PIXI.Graphics();
    hp.beginFill(0xff0000);
    hp.drawRect(0, 0, HP_BAR_WIDTH, HP_BAR_HEIGHT);
    hp.endFill();

    maxHp.addChild(hp);
    this.gr.addChild(maxHp);

    this.hpBar = hp;
    this.hpBar.parent.visible = false;

    this.updateHpBar();
  }

  public updateHpBar() {
    if (this.hpBar) {
      this.hpBar.width = (this.hp * HP_BAR_WIDTH) / this.maxHp;

      // If the soldier has lost hp, the hp bar will be visible
      if (this.hp !== this.maxHp) {
        this.hpBar.parent.visible = true;
      }
    }
  }

  createGraphic(app: PIXI.Application) {
    const gr = this.gr;

    gr.beginFill(this.color);
    gr.lineStyle(2, 0xfafad2);
    gr.drawCircle(0, 0, this.width / 2);
    gr.endFill();

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    // Sprite
    const texture = textures[this.shapeType];
    const sprite = new PIXI.Sprite(texture);
    // change the sprite's size
    sprite.width = this.width;
    sprite.height = this.height;
    // center the sprite's anchor point
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    gr.addChild(sprite);

    app.stage.addChild(gr);
  }

  hurt(damage: number) {
    super.hurt(damage);
    this.updateHpBar();
  }

  die() {
    this.gr.destroy();
  }

  move(vector: Vector2D) {
    this.gr.position.x += vector.x;
    this.gr.position.y += vector.y;

    super.move(vector);
  }

}
