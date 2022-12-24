import * as PIXI from "pixi.js";

import { IEntity } from "./entity/entity";
import Soldier, { ISoldier } from "./entity/soldier";
import Vector2D from "./vector-2d";

export default class Game {
  app: PIXI.Application;

  private agents: Map<string, Soldier> = new Map();

  constructor(app: PIXI.Application) {
    this.app = app;
  }

  addSoldier(props: ISoldier) {
    const soldier = new Soldier(props);
    soldier.createSprite(this.app);

    this.agents.set(soldier.uuid, soldier);
  }

  public moveAgentTo(agent: Soldier, x: number, y: number, speed?: number) {
    let speedToUse = speed ? speed : agent.speed;

    const originalMovement = agent.getMovementTo(x, y, speedToUse);
    const movement = originalMovement.clone();

    if (movement.isZero()) {
      return;
    }

    for (let otherAgent of this.agents.values()) {
      if (agent === otherAgent) {
        continue;
      }

      // The player will not collide with his allies
      if (
        agent.team === otherAgent.team &&
        agent.timeCreated < otherAgent.timeCreated
      ) {
        continue;
      }

      const isXColliding = agent.isCollidingWith(
        otherAgent,
        agent.position.x + movement.x,
        agent.position.y
      );
      const isYColliding = agent.isCollidingWith(
        otherAgent,
        agent.position.x,
        agent.position.y + movement.y
      );

      if (isXColliding) {
        const distanceToAgent1 = agent.getDistance(
          otherAgent.position.x,
          otherAgent.position.y
        );
        const distanceToAgent2 = agent.getDistance(
          otherAgent.position.x,
          otherAgent.position.y,
          movement.x,
          0
        );

        if (distanceToAgent1 < distanceToAgent2) {
          movement.setX(0);
        }
      }
      if (isYColliding) {
        const distanceToAgent1 = agent.getDistance(
          otherAgent.position.x,
          otherAgent.position.y
        );
        const distanceToAgent2 = agent.getDistance(
          otherAgent.position.x,
          otherAgent.position.y,
          0,
          movement.y
        );

        if (distanceToAgent1 < distanceToAgent2) {
          movement.setY(0);
        }
      }
      if (movement.isZero()) {
        agent.move(originalMovement.getOrthogonal(agent.timeCreated % 2 === 0));
        return;
      }
    }

    agent.move(movement);
  }

  public getTheCloserEnemyOf(position: Vector2D, team: number) {
    let distance = Number.POSITIVE_INFINITY;
    let closerEnemy: Soldier | null = null;

    this.agents.forEach((a) => {
      if (a.team === team || a.isDead) {
        return;
      }

      const distanceToAgent = position.getDistance(a.position);

      if (distanceToAgent < distance) {
        closerEnemy = a;
        distance = distanceToAgent;
      }
    });

    return closerEnemy!;
  }

  public getTheCloserEnemyOfAgent(agent: Soldier) {
    return this.getTheCloserEnemyOf(agent.position, agent.team);
  }

  tick() {
    this.agents.forEach((a) => {
      a.think(this);
    });

    // Removes dead agents
    this.agents.forEach((a) => {
      if (a.isDead) {
        this.agents.delete(a.uuid);
        a.die();
      }
    });
  }
}