import { useEffect } from "react";
import { useLocation } from "react-router";
import { GameMode } from "../../game/game-modes";
import { startGame } from "../../game/start-game";

export default function GameView() {
  const { search } = useLocation();

  useEffect(() => {
    const mode = new URLSearchParams(search).get("mode");
    startGame(mode as GameMode);
  }, []);

  return <div className="Game" />;
}
