import * as PIXI from "pixi.js";
import Soldier from "./entity/shape";
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
  canvasContainer!.appendChild(app.view as any);
  const stage = app.stage;
  stage.sortableChildren = true;

  const game = new Game(app);

  const keyboard = new Keyboard();

  const player1Base = { x: 200, y: 200 };
  const player2Base = { x: 1080, y: 520 };

  // Creates the player bases
  const base1 = game.createBase({
    position: new Vector2D(player1Base.x, player1Base.y),
    team: 1,
  });
  const base2 = game.createBase({
    position: new Vector2D(player2Base.x, player2Base.y),
    team: 2,
  });
  game.addShape(base1);
  game.addShape(base2);

  const keysCallback = [
    {
      // W
      cond: () => keyboard.isPressed(87) && game.canPlayerBuy(1),
      shape: () =>
        game.createCircle({
          position: new Vector2D(player1Base.x, player1Base.y),
          team: 1,
        }),
    },
    {
      // S
      cond: () => keyboard.isPressed(83) && game.canPlayerBuy(1),
      shape: () =>
        game.createTriangle({
          position: new Vector2D(player1Base.x, player1Base.y),
          team: 1,
        }),
    },
    {
      // A
      cond: () => keyboard.isPressed(65) && game.canPlayerBuy(1),
      shape: () =>
        game.createSquare({
          position: new Vector2D(player1Base.x, player1Base.y),
          team: 1,
        }),
    },

    {
      // Arrow up
      cond: () => keyboard.isPressed(38) && game.canPlayerBuy(2),
      shape: () =>
        game.createCircle({
          position: new Vector2D(player2Base.x, player2Base.y),
          team: 2,
        }),
    },

    {
      // Arrow down
      cond: () => keyboard.isPressed(40) && game.canPlayerBuy(2),
      shape: () =>
        game.createTriangle({
          position: new Vector2D(player2Base.x, player2Base.y),
          team: 2,
        }),
    },

    {
      // Arrow left
      cond: () => keyboard.isPressed(37) && game.canPlayerBuy(2),
      shape: () =>
        game.createSquare({
          position: new Vector2D(player2Base.x, player2Base.y),
          team: 2,
        }),
    },
  ];

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
