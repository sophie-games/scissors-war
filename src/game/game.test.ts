import Game from "./game";
import { SINGLE_PLAYER } from "./game-modes";
import Ai from "./player/ai";
import { PAPER, ROCK, SCISSORS, ShapeType } from "./shape-types";

describe("Game", () => {
  describe("Ai", () => {
    describe("getShapeToBuy", () => {
      interface itests {
        input: ShapeType;
        output: ShapeType;
      }
      const tests: itests[] = [
        { input: PAPER, output: SCISSORS },
        { input: ROCK, output: PAPER },
        { input: SCISSORS, output: ROCK },
      ];

      let game: Game, ai: Ai;
      beforeEach(() => {
        game = new Game(SINGLE_PLAYER);

        const playerAi = game.players.get(2);
        if (!playerAi) throw new Error("Ai is undefined");

        ai = playerAi;
      });

      tests.forEach((eachTest) => {
        test(`should return ${eachTest.output} if the enemy has ${eachTest.input}.`, () => {
          const shape = game.createShape(eachTest.input, 1);
          game.addShape(shape);

          expect(ai.getShapeToBuy(game)).toBe(eachTest.output);
        });
      });
    });
  });
});
