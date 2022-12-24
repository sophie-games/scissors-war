import * as PIXI from "pixi.js";
import Game from "../game";
import Vector2D from "../vector-2d";

import Entity, { IEntity } from "./entity";

const HP_BAR_WIDTH = 56;
const HP_BAR_HEIGHT = 10;

export interface ISoldier extends IEntity {
  team: 1 | 2;
}

export default class Soldier extends Entity {
  team: 1 | 2;

  maxHp = 100;
  hp: number;
  attack = 1;
  speed = 1;

  private gr = new PIXI.Graphics();
  private hpBar?: PIXI.Graphics;

  constructor(props: ISoldier) {
    super(props);

    this.team = props.team;
    this.hp = this.maxHp;
  }

  get isDead() {
    return this.hp <= 0;
  }

  createSprite(app: PIXI.Application) {
    const gr = this.gr;

    switch (this.team) {
      case 1: {
        gr.beginFill(0x0096ff);
        break;
      }

      case 2: {
        gr.beginFill(0xee4b2b);
        break;
      }
    }

    gr.drawCircle(30, 30, this.width / 2);
    gr.endFill();
    app.stage.addChild(gr);

    gr.position.x = this.position.x;
    gr.position.y = this.position.y;

    this.createHpBar(gr);
  }

  private createHpBar(gr: PIXI.Graphics) {
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
    gr.addChild(maxHp);

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
    const closerEnemy = game.getTheCloserEnemyOfAgent(this);

    if (!closerEnemy) return;

    game.moveAgentTo(this, closerEnemy.position.x, closerEnemy.position.y);

    const distance = this.position.getDistance(closerEnemy.position);

    if (distance > this.width + 10) return;

    closerEnemy.hurt(this.attack);
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
}
