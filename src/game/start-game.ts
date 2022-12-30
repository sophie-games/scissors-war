import * as PIXI from "pixi.js";
import isTouchDevice from "is-touch-device";

import { graphicMap } from "./entity/graphics/graphic-map";
import Game from "./game";
import { GameMode, TWO_PLAYERS } from "./game-modes";
import Keyboard from "./keyboard";
import { BASE, PAPER, ROCK, SCISSORS } from "./shape-types";
import UI from "./ui";
import Vector2D from "./vector-2d";

interface IStartGame {
  mode: GameMode;
  onFinish: () => any;
  isTouch: boolean;
}

const isHorizontalScreen = window.innerWidth > window.innerHeight;
const SCREEN_WIDTH = isHorizontalScreen ? 800 : 600;
const SCREEN_HEIGHT = isHorizontalScreen ? 600 : 800;

export function startGame({ mode, onFinish, isTouch }: IStartGame) {
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

  const baseMargin = 150;
  const player1BasePosition = new Vector2D(baseMargin, baseMargin);
  const player2BasePosition = new Vector2D(
    SCREEN_WIDTH - baseMargin,
    SCREEN_HEIGHT - baseMargin
  );

  const game = new Game(mode, player1BasePosition, player2BasePosition);
  const ui = new UI({
    game: game,
    container: app.stage,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });

  game.onShapeAdded((shape) => {
    const GrClass = graphicMap[shape.shapeType];

    const gr = new GrClass({
      team: shape.team,
      position: shape.position.clone(),
    });
    gr.init(app, shape);
    shape.addEntity(gr);
  });

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
    ui.update(game);

    keysCallback.forEach((keyData) => {
      if (!keyData.cond()) return;
      const shape = keyData.shape();
      game.buyShape(shape);
    });
  });

  return {
    game,
    finishCallback: () => {
      // This is only in case the user has gone to another tab without finishing the game.
      if (app.stage) app.destroy();
    },
  };
}
