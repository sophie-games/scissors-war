import { Link } from "react-router-dom";
import {
  FaCaretSquareUp,
  FaCaretSquareLeft,
  FaCaretSquareRight,
} from "react-icons/fa";

import { SINGLE_PLAYER, TWO_PLAYERS } from "../../game/game-modes";

export default function HomeView() {
  return (
    <div>
      <div className="buttons-container">
      <h2>
        <Link to={{ pathname: "/game", search: `?mode=${SINGLE_PLAYER}` }}>
          Single player
        </Link>
      </h2>
      <span>&nbsp;-&nbsp;</span>
      <h2>
        <Link to={{ pathname: "/game", search: `?mode=${TWO_PLAYERS}` }}>
          Two players
        </Link>
      </h2>
      </div>

      <div className="instructions">
        <p>
          Based on the classic game of rock, paper and scissors in this game you
          can play as one or two players.
        </p>
        <p>
          The objective is to destroy the big hand of the other player by
          sending to them hands of rock, paper and scissors, But keep in mind
          that they can also create them against you.
        </p>
        <p>
          To create rocks, papers or scissors you'll have to use the controls
          below. They'll cost you points, points that you'll earn by waiting and
          destroying the other player hands.
        </p>
      </div>

      <div className="control-player-container">
        <h3>Controls player 1:</h3>
        <p className="control-container">
          <span className="control">
            <b>A</b>&nbsp;Paper
          </span>
          <span className="control">
            <b>W</b>&nbsp;Scissors
          </span>
          <span className="control">
            <b>D</b>&nbsp;Rock
          </span>
        </p>
      </div>

      <div className="control-player-container">
        <h3>Controls player 2:</h3>
        <p className="control-container">
          <span className="control">
            <FaCaretSquareLeft />
            &nbsp;Paper
          </span>
          <span className="control">
            <FaCaretSquareUp />
            &nbsp;Scissors
          </span>
          <span className="control">
            <FaCaretSquareRight />
            &nbsp;Rock
          </span>
        </p>
      </div>
    </div>
  );
}
