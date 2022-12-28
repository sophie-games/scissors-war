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
    </div>
  );
}
