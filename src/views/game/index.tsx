import isTouchDevice from "is-touch-device";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import Game from "../../game/game";
import { GameMode } from "../../game/game-modes";
import { PAPER, ROCK, SCISSORS, ShapeType } from "../../game/shape-types";
import { startGame } from "../../game/start-game";

const isTouch = isTouchDevice();

export default function GameView() {
  const gameRef = useRef<Game | null>(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const mode = new URLSearchParams(search).get("mode");
    const onFinish = () => {
      navigate("/");
    };

    const { game, finishCallback } = startGame({
      mode: mode as GameMode,
      onFinish,
      isTouch,
    });

    gameRef.current = game;

    return () => {
      finishCallback();
    };
  }, []);

  const handleClick = (shapeType: ShapeType, team: 1 | 2) => {
    if (!gameRef.current) return;

    const shape = gameRef.current.createShape(shapeType, team);
    gameRef.current.buyShape(shape);
  };

  return (
    <div>
      {isTouch && (
        <div>
          <button onClick={() => handleClick(PAPER, 1)}>A</button>
          <button onClick={() => handleClick(ROCK, 1)}>W</button>
          <button onClick={() => handleClick(SCISSORS, 1)}>D</button>
        </div>
      )}

      <div className="Game" />

      {isTouch && (
        <div>
          <button onClick={() => handleClick(PAPER, 2)}>←</button>
          <button onClick={() => handleClick(ROCK, 2)}>↑</button>
          <button onClick={() => handleClick(SCISSORS, 2)}>→</button>
        </div>
      )}
    </div>
  );
}
