import { useState } from "react";
import "./App.css";
import MemoryBoard from "./components/MemoryBoard";

function App() {
  const [countTries, setCountTries] = useState(0);
  const [endGame, setEndGame] = useState(false);

  return (
    <>
      <h1>{countTries} tries</h1>
      {!endGame && <h2>Win</h2>}
      <MemoryBoard setCountTries={setCountTries} setEndGame={setEndGame} />
    </>
  );
}

export default App;
