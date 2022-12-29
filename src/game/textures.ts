import * as PIXI from "pixi.js";
import { PAPER, ROCK, SCISSORS, BASE } from "./shape-types";

interface ITextures {
  [key: string]: PIXI.Texture;
}

const textures: ITextures = {
  [ROCK]: PIXI.Texture.from("/scissors-war/rock.png"),
  [SCISSORS]: PIXI.Texture.from("/scissors-war/scissors.png"),
  [PAPER]: PIXI.Texture.from("/scissors-war/paper.png"),
  [BASE]: PIXI.Texture.from("/scissors-war/base.png"),
};

export default textures;
