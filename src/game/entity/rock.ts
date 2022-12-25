import Shape from "./shape";
import { ShapeType, ROCK } from "../shape-types";

export default class Rock extends Shape {
  shapeType: ShapeType = ROCK;
}
