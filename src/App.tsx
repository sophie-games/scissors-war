import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Views
import GameView from "./views/game";
import HomeView from "./views/home";

function App() {

  return (
    <div className="App">
      <h1>Scissors War</h1>

      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/game" element={<GameView />} />
        </Routes>
      </Router>

      <div className="Game" />
    </div>
  );
}

export default App;
