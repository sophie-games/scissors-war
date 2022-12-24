import { useEffect } from "react";
import "./App.css";
import { startGame } from "./game/start-game";

function App() {
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="App">
      <h2>Medieval War</h2>

      <div className="Game" />
    </div>
  );
}

export default App;
