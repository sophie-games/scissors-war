import * as PIXI from "pixi.js";
import Soldier from "./entity/agent";
import Game from "./game";
import Keyboard from "./keyboard";
import Vector2D from "./vector-2d";

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

export function startGame() {
  // ---------------------------------------------------------- //

  const app = new PIXI.Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  const canvasContainer = document.querySelector(".Game");
  // Adding the app to the DOM
  canvasContainer!.appendChild(app.view);
  const stage = app.stage;
  stage.sortableChildren = true;

  const game = new Game(app);

  const keyboard = new Keyboard();

  let lastTimePlayer1Create = Date.now();
  let lastTimePlayer2Create = Date.now();

  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add(() => {
    game.tick();

    const now = Date.now();

    const player1Delay = now - lastTimePlayer1Create;
    const player2Delay = now - lastTimePlayer2Create;
    const delayToCreate = 1000;

    if (keyboard.isPressed(87) && player1Delay > delayToCreate) {
      // W
      game.addWarrior({ position: new Vector2D(200, 400), team: 1 });
      lastTimePlayer1Create = now;
    }
    if (keyboard.isPressed(83) && player1Delay > delayToCreate) {
      // S
      game.addMage({ position: new Vector2D(200, 400), team: 1 });
      lastTimePlayer1Create = now;
    }

    if (keyboard.isPressed(38) && player2Delay > delayToCreate) {
      // Arrow up
      game.addWarrior({ position: new Vector2D(800, 400), team: 2 });
      lastTimePlayer2Create = now;
    }
    if (keyboard.isPressed(40) && player2Delay > delayToCreate) {
      // Arrow down
      game.addMage({ position: new Vector2D(800, 400), team: 2 });
      lastTimePlayer2Create = now;
    }
  });
}
