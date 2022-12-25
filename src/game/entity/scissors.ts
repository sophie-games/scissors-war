import Shape from "./shape";
import { ShapeType, SCISSORS } from "../shape-types";

export default class Scissors extends Shape {
  shapeType: ShapeType = SCISSORS;
}
