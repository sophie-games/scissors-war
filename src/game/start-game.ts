import * as PIXI from "pixi.js";
import Game from "./game";
import { GameMode, TWO_PLAYERS } from "./game-modes";
import Keyboard from "./keyboard";
import { BASE, PAPER, ROCK, SCISSORS } from "./shape-types";
import Vector2D from "./vector-2d";

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

export function startGame(mode: GameMode, onFinish: () => any) {
  // ---------------------------------------------------------- //

  const app = new PIXI.Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  const canvasContainer = document.querySelector(".Game");
  // Adding the app to the DOM
  canvasContainer!.appendChild(app.view as any);
  const stage = app.stage;
  stage.sortableChildren = true;

  const player1BasePosition = new Vector2D(200, 200);
  const player2BasePosition = new Vector2D(1080, 520);

  const game = new Game(app, mode, player1BasePosition, player2BasePosition);

  const keyboard = new Keyboard();

  // Creates the player bases
  const base1 = game.createShape(BASE, 1);
  const base2 = game.createShape(BASE, 2);
  game.addShape(base1);
  game.addShape(base2);

  base1.onDie(() => {
    alert("Player 2 wins!");
    app.destroy();
    onFinish();
  });
  base2.onDie(() => {
    alert("Player 1 wins!");
    app.destroy();
    onFinish();
  });

  const keysCallback = [
    {
      // W
      cond: () => keyboard.isPressed(87) && game.canPlayerBuy(1),
      shape: () => game.createShape(SCISSORS, 1),
    },
    {
      // A
      cond: () => keyboard.isPressed(65) && game.canPlayerBuy(1),
      shape: () => game.createShape(PAPER, 1),
    },
    {
      // D
      cond: () => keyboard.isPressed(68) && game.canPlayerBuy(1),
      shape: () => game.createShape(ROCK, 1),
    },
  ];

  if (mode === TWO_PLAYERS) {
    // If the mode is two players the second player keys will be added
    keysCallback.push(
      {
        // Arrow up
        cond: () => keyboard.isPressed(38) && game.canPlayerBuy(2),
        shape: () => game.createShape(SCISSORS, 2),
      },

      {
        // Arrow left
        cond: () => keyboard.isPressed(37) && game.canPlayerBuy(2),
        shape: () => game.createShape(PAPER, 2),
      },

      {
        // Arrow right
        cond: () => keyboard.isPressed(39) && game.canPlayerBuy(2),
        shape: () => game.createShape(ROCK, 2),
      }
    );
  }

  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add(() => {
    game.tick();

    keysCallback.forEach((keyData) => {
      if (!keyData.cond()) return;

      const shape = keyData.shape();
      game.buyShape(shape);
    });
  });
}
