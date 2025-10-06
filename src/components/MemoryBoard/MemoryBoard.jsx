import { useEffect, useState } from "react";
import { cards } from "../../lib/config";
import "./memoryBoard.css";

export default function PuzzleBoard({
  setTime,
  setCountTries,
  endGame,
  setEndGame,
}) {
  const [startGame, setStartGame] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [correctCards, setCorrectCards] = useState([]);
  const [wrongCards, setWrongCards] = useState([]);

  const totalCards = [...cards, ...cards].map((card, index) => ({
    ...card,
    uniqueId: index,
  }));

  const [shuffledCards, setShuffledCards] = useState(() =>
    shuffleArray(totalCards)
  );

  // Shuffle deck
  // Fisher-Yates shuffle
  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Select card, Start Game
  const selectCard = (card) => {
    if (!startGame) setStartGame(true);
    if (
      selectedCards.length < 2 &&
      !selectedCards.includes(card) &&
      !correctCards.includes(card)
    ) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  // Check matching cards
  useEffect(
    () => {
      if (selectedCards.length === 2) {
        const [first, second] = selectedCards;
        // Increment tries
        setCountTries((prev) => prev + 1);

        if (first.id === second.id) {
          // Add selected cards to correct cards
          setCorrectCards((prev) => [...prev, ...selectedCards]);
        } else {
          // Temporary add cards to wrong cards for styling
          setWrongCards([...selectedCards]);
        }
        // Clear selected & wrong cards after a set timeout
        const timeout = setTimeout(() => {
          setSelectedCards([]);
          setWrongCards([]);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    },
    // Run useEffect everytime selectedCards is changed
    [selectedCards]
  );

  // Set class for styling
  const setClass = (card) => {
    if (wrongCards.includes(card)) {
      return "card card-wrong";
    } else if (correctCards.includes(card)) {
      return "card card-correct";
    } else if (selectedCards.includes(card)) {
      return "card card-selected";
    } else {
      return "card card-backside";
    }
  };

  // Start Timer, stores cleanup
  useEffect(() => {
    if (!startGame || endGame) return;

    const interval = setInterval(() => setTime((prev) => prev + 0.1), 100);
    return () => clearInterval(interval);
  }, [startGame, endGame]);

  // End Game if condition is met
  useEffect(() => {
    if (totalCards.length === correctCards.length) {
      setStartGame(false);
      setEndGame(true);
    }
  }, [correctCards]);

  // Restart Game
  useEffect(() => {
    if (!endGame) {
      setStartGame(false);
      setEndGame(false);
      setSelectedCards([]);
      setCorrectCards([]);
      setWrongCards([]);
      setCountTries(0);
      setTime(0);
      setShuffledCards(shuffleArray(totalCards));
    }
  }, [endGame]);

  return (
    <>
      <section className="board">
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            className={setClass(card)}
            onClick={() => selectCard(card)}
          >
            <img src={card.img} alt={`Image of a ${card.name}`} />
          </div>
        ))}
      </section>
    </>
  );
}
