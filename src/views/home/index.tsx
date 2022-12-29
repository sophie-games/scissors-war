import { Link } from "react-router-dom";
import { SINGLE_PLAYER, TWO_PLAYERS } from "../../game/game-modes";

export default function HomeView() {
  return (
    <div>
      <h2>
        <Link to={{ pathname: "/game", search: `?mode=${SINGLE_PLAYER}` }}>
          Single player
        </Link>
      </h2>
      <h2>
        <Link to={{ pathname: "/game", search: `?mode=${TWO_PLAYERS}` }}>
          Two players
        </Link>
      </h2>

      <h3>Controls player 1:</h3>
      <p>A: Paper</p>
      <p>W: Scissors</p>
      <p>D: Rock</p>

      <h3>Controls player 2:</h3>
      <p>Arrow left: Paper</p>
      <p>Arrow up: Scissors</p>
      <p>Arrow right: Rock</p>

    </div>
  );
}
