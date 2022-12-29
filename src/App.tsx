import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import CreatedBy from "./components/created-by";

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

      <CreatedBy />
    </div>
  );
}

export default App;
