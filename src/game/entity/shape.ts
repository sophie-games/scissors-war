import * as PIXI from "pixi.js";
import Game from "../game";
import Vector2D from "../vector-2d";

import Entity, { IEntity } from "./entity";
import { ShapeType, UNDEFINED } from "../shape-types";
import { attackBonus } from "../attack-bonus";
import textures from "../textures";

const HP_BAR_WIDTH = 56;
const HP_BAR_HEIGHT = 10;

export interface IShape extends IEntity {
  team: 1 | 2;
}

export default class Shape extends Entity {
  team: 1 | 2;

  maxHp = 200;
  hp: number;
  attack = 1;
  speed = 1;
  gold = 50;

  shapeIgnoredByAllies = false;

  shapeType: ShapeType = UNDEFINED;

  protected gr = new PIXI.Graphics();
  private hpBar?: PIXI.Graphics;

  constructor(props: IShape) {
    super(props);

    this.team = props.team;
    this.hp = this.maxHp;
  }

  get isDead() {
    return this.hp <= 0;
  }

  get color() {
    return this.team === 1 ? 0x0096ff : 0xee4b2b;
  }

  init(app: PIXI.Application) {
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

  public getMovementTo(x: number, y: number, speed = this.speed) {
    const rotation = this.getRotationTo(x, y);
    return new Vector2D(Math.cos(rotation) * speed, Math.sin(rotation) * speed);
  }

  public think(game: Game) {
    const closerEnemy = game.getTheCloserEnemyOfShape(this);

    if (!closerEnemy) return;

    game.moveShapeTo(this, closerEnemy.position.x, closerEnemy.position.y);

    const distance = this.position.getDistance(closerEnemy.position);

    if (distance > this.width + 10 && distance > closerEnemy.width + 10) return;

    const attackWithBonus = attackBonus(
      this.shapeType,
      closerEnemy.shapeType,
      this.attack
    );

    closerEnemy.hurt(attackWithBonus);
    closerEnemy.updateHpBar();
  }

  move(vector: Vector2D) {
    super.move(vector);

    this.gr.position.x += vector.x;
    this.gr.position.y += vector.y;
  }

  hurt(damage: number) {
    this.hp -= damage;
  }

  die() {
    this.gr.destroy();
  }

  protected createGraphic(app: PIXI.Application) {
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
}
