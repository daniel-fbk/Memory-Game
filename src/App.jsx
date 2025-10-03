import { useState } from "react";
import "./App.css";
import PuzzleBoard from "./components/PuzzleBoard";

function App() {
  const [countAttempts, setCountAttempts] = useState(0);

  return (
    <>
      <h1>{countAttempts}</h1>
      <PuzzleBoard></PuzzleBoard>
    </>
  );
}

export default App;
