import * as PIXI from "pixi.js";
import Game from "../game";
import Vector2D from "../vector-2d";

import Entity, { IEntity } from "./entity";

const HP_BAR_WIDTH = 56;
const HP_BAR_HEIGHT = 10;

export interface IAgent extends IEntity {
  team: 1 | 2;
}

export default class Agent extends Entity {
  team: 1 | 2;

  maxHp = 100;
  hp: number;
  attack = 1;
  speed = 1;

  protected gr = new PIXI.Graphics();
  private hpBar?: PIXI.Graphics;

  constructor(props: IAgent) {
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

  protected createGraphic(app: PIXI.Application) {
    throw new Error("Must be declared in subclass");
  }

  protected createHpBar() {
    const maxHp = new PIXI.Graphics();
    maxHp.beginFill(0x4a0707);
    maxHp.drawRect(0, 0, HP_BAR_WIDTH, HP_BAR_HEIGHT);
    maxHp.endFill();
    maxHp.position.y = -HP_BAR_HEIGHT - 10;

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
    throw new Error("Must be declared in subclass");
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
}
