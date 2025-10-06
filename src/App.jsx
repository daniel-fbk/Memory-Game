import { useState } from "react";
import "./App.css";
import MemoryBoard from "./components/MemoryBoard/MemoryBoard";
import ScoreBoard from "./components/Stats/ScoreBoard";

function App() {
  const [countTries, setCountTries] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [time, setTime] = useState(0);
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <main>
        <div className="tries-time">
          <h2>
            {countTries} <span>Tries</span>
          </h2>
          <h2>
            {time.toFixed(1)} <span>Seconds</span>
          </h2>
        </div>

        <div className="board-container">
          <MemoryBoard
            setCountTries={setCountTries}
            endGame={endGame}
            setEndGame={setEndGame}
            setTime={setTime}
          />
          <ScoreBoard
            tries={countTries}
            time={time}
            endGame={endGame}
            showResults={showResults}
          />
        </div>
        <div className="buttons-container">
          {endGame && (
            <>
              <button
                className="results-button"
                onClick={() => setShowResults((prev) => !prev)}
              >
                {showResults ? "Hide Hiscore" : "View Hiscore"}
              </button>
              <button
                className="restart-button"
                onClick={() => setEndGame(false)}
              >
                Restart Game
              </button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
