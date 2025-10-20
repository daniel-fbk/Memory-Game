import { useState, useEffect } from "react";
import "./scoreBoard.css";
import { saveScore, getTopScores } from "../../lib/firebase";

export default function Stats({ tries, time, endGame, showResults }) {
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [topScores, setTopScores] = useState([]);

  // Show or hide stats overlay
  const showStats = showResults ? "stats-overlay" : "stats-overlay stats-hide";

  // Fetch top scores when the component mounts or after submission
  useEffect(() => {
    if (endGame) {
      fetchTopScores();
    }
  }, [endGame, submitted]);

  const fetchTopScores = async () => {
    const scores = await getTopScores();
    setTopScores(scores);
  };

  // Handle submitting score
  const handleSubmit = async () => {
    if (!playerName) return;
    await saveScore(playerName, tries, time);
    setSubmitted(true);
  };

  return (
    <>
      {endGame && (
        <article className={showStats}>
          <h4>Hiscore</h4>
          <ol>
            {topScores.map((score, index) => (
              <li key={index}>
                {score.name}: {score.score}, {score.time}s
              </li>
            ))}
          </ol>
          <h3>Your Score: {tries}</h3>

          {!submitted ? (
            <>
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit Score</button>
            </>
          ) : (
            <p>Score submitted!</p>
          )}
        </article>
      )}
    </>
  );
}
