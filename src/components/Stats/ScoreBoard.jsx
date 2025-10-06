import "./scoreBoard.css";

export default function Stats({ tries, time, endGame, showResults }) {
  // Show or Hide Stats Overlay
  const showStats = showResults ? "stats-overlay" : "stats-overlay stats-hide";

  return (
    <>
      {endGame && (
        <>
          <article className={showStats}>
            <h3>Score</h3>
            <input type="text" />
          </article>
        </>
      )}
    </>
  );
}
