import Game from "../game";
import Vector2D from "../vector-2d";

export default class Player {
  private __gold = 150;
  private goldPerSec = 10;
  private lastTimeGoldEarned = Date.now();
  private lastTimeBought = 0;
  private buyDelay = 500;
  team: 1 | 2;
  startPosition: Vector2D;

  constructor(team: 1 | 2, startPosition: Vector2D) {
    this.team = team;
    this.startPosition = startPosition;
  }

  checkToEarnGold = (time: number) => {
    const delta = time - this.lastTimeGoldEarned;

    if (delta < 1000) return;

    this.earnGold(this.goldPerSec)
    this.lastTimeGoldEarned = time;
  };
  checkIfCanBuy = (time: number) => {
    return time - this.lastTimeBought >= this.buyDelay;
  };
  updateLastTimeBought = (time: number) => {
    this.lastTimeBought = time;
  };

  get gold() {
    return this.__gold;
  }
  earnGold(gold: number) {
    this.__gold += gold;
  }
  subtractGold(gold: number) {
    this.__gold -= gold;
  }

  think(game: Game) {
    // Does nothing
  }
}
