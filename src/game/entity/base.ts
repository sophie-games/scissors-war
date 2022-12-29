import { BASE, ShapeType } from "../shape-types";

import Shape from "./shape";

export default class Base extends Shape {
  shapeType: ShapeType = BASE;

  width = 100;
  height = 100;

  maxHp = 2000;
  hp = 2000;
  attack = 1;
  speed = 0;
  gold = 0;

  shapeIgnoredByAllies = true;
}
