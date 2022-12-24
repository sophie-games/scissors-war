import Vector2D from "../vector-2d";

export interface IEntity {
  uuid?: string;
  position: Vector2D;
}

export default class Entity {
  public position: Vector2D;
  public spriteData?: any;
  private entities: Entity[];

  public uuid: string;

  width = 60;
  height = 60;

  timeCreated = Date.now();

  constructor(props: IEntity) {
    this.entities = [];
    this.position = props.position;
    this.uuid = props.uuid || createUUID();
  }

  public move(vector: Vector2D) {
    this.position.sum(vector);
    this.entities.forEach((e) => e.move(vector));
  }

  public moveTo(vector: Vector2D) {
    const offsetX = vector.x - this.position.x;
    const offsetY = vector.y - this.position.y;
    this.move(new Vector2D(offsetX, offsetY));
  }

  public getDistance(x: number, y: number, sumX = 0, sumY = 0) {
    let y0 = x - this.position.x + sumX;
    let x0 = y - this.position.y + sumY;
    return Math.sqrt(x0 * x0 + y0 * y0);
  }

  public getRotationTo(x: number, y: number) {
    return rotationToPoint(x, y, this.position.x, this.position.y);
  }

  public isCollidingWith(e: Entity, customX?: number, customY?: number) {
    const hw = this.width / 2; // Half width
    const hh = this.height / 2; // Half height

    const ehw = e.width / 2; // Entity half width
    const ehh = e.height / 2; // Entity half height

    const posX = customX !== undefined ? customX : this.position.x;
    const posY = customY !== undefined ? customY : this.position.y;

    const isXColliding =
      e.position.x + hw >= posX - ehw && e.position.x - hw <= posX + ehw;
    const isYColliding =
      e.position.y + hh >= posY - ehh && e.position.y - hh <= posY + ehh;

    return isXColliding && isYColliding;
  }
}

function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export function rotationToPoint(
  mx: number,
  my: number,
  px: number,
  py: number
) {
  const dist_Y = my - py;
  const dist_X = mx - px;
  const angle = Math.atan2(dist_Y, dist_X);
  // const degrees = angle * 180/ Math.PI;
  return angle;
}
