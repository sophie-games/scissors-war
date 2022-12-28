import * as PIXI from "pixi.js";
import Soldier from "./entity/shape";
import Game from "./game";
import { GameMode, TWO_PLAYERS } from "./game-modes";
import Keyboard from "./keyboard";
import Vector2D from "./vector-2d";

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

export function startGame(mode: GameMode) {
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
  const base1 = game.createBase({
    position: player1BasePosition.clone(),
    team: 1,
  });
  const base2 = game.createBase({
    position: player2BasePosition.clone(),
    team: 2,
  });
  game.addShape(base1);
  game.addShape(base2);

  const keysCallback = [
    {
      // W
      cond: () => keyboard.isPressed(87) && game.canPlayerBuy(1),
      shape: () =>
        game.createScissors({
          position: player1BasePosition.clone(),
          team: 1,
        }),
    },
    {
      // A
      cond: () => keyboard.isPressed(65) && game.canPlayerBuy(1),
      shape: () =>
        game.createPaper({
          position: player1BasePosition.clone(),
          team: 1,
        }),
    },
    {
      // D
      cond: () => keyboard.isPressed(68) && game.canPlayerBuy(1),
      shape: () =>
        game.createRock({
          position: player1BasePosition.clone(),
          team: 1,
        }),
    },
  ];

  if (mode === TWO_PLAYERS) {
    // If the mode is two players the second player keys will be added
    keysCallback.push(
      {
        // Arrow up
        cond: () => keyboard.isPressed(38) && game.canPlayerBuy(2),
        shape: () =>
          game.createScissors({
            position: player2BasePosition.clone(),
            team: 2,
          }),
      },

      {
        // Arrow left
        cond: () => keyboard.isPressed(37) && game.canPlayerBuy(2),
        shape: () =>
          game.createPaper({
            position: player2BasePosition.clone(),
            team: 2,
          }),
      },

      {
        // Arrow right
        cond: () => keyboard.isPressed(39) && game.canPlayerBuy(2),
        shape: () =>
          game.createRock({
            position: player2BasePosition.clone(),
            team: 2,
          }),
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
