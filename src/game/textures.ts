import * as PIXI from "pixi.js";
import { PAPER, ROCK, SCISSORS } from "./shape-types";

interface ITextures {
  [key: string]: PIXI.Texture;
}

const textures: ITextures = {
  [ROCK]: PIXI.Texture.from("/medieval-war/rock.png"),
  [SCISSORS]: PIXI.Texture.from("/medieval-war/scissors.png"),
  [PAPER]: PIXI.Texture.from("/medieval-war/paper.png"),
};

export default textures;
