
import Game from "../game";
import Vector2D from "../vector-2d";

import Entity, { IEntity } from "./entity";
import { ROCK, ShapeType } from "../shape-types";
import { attackBonus } from "../attack-bonus";


export interface IShape extends IEntity {
  team: 1 | 2;
}

export default class Shape extends Entity {
  team: 1 | 2;

  maxHp = 200;
  hp: number;
  attack = 1;
  speed = 1.5;
  gold = 50;

  shapeIgnoredByAllies = false;
  shapeType: ShapeType = ROCK;
  private _dieEvents: (() => any)[] = [];

  constructor(props: IShape) {
    super(props);

    this.team = props.team;
    this.hp = this.maxHp;
  }

  get isDead() {
    return this.hp <= 0;
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
  }

  hurt(damage: number) {
    this.hp -= damage;
    super.hurt(damage);
  }

  die() {
    this._dieEvents.forEach((event) => event());
    super.die();
  }

  onDie(callback: () => any) {
    this._dieEvents.push(callback);
  }
}
