import Game from "./game";
import { SINGLE_PLAYER } from "./game-modes";
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

      tests.forEach((eachTest) => {
        test(`should return ${eachTest.output} if the enemy has ${eachTest.input}.`, () => {
          const game = new Game(SINGLE_PLAYER);

          const ai = game.players.get(2);

          if (!ai) throw new Error("Ai is undefined");

          const paper = game.createShape(eachTest.input, 1);
          game.addShape(paper);

          expect(ai.getShapeToBuy(game)).toBe(eachTest.output);
        });
      });
    });
  });
});
