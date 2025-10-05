import { useEffect, useState } from "react";
import { cards } from "../lib/config";
import "./memoryBoard.css";

export default function PuzzleBoard({ setCountTries, setEndGame }) {
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

  // Fisher-Yates shuffle
  // Shuffle deck
  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Select card
  const selectCard = (card) => {
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

  // End Game if condition is met
  useEffect(() => {
    if (totalCards.length === correctCards.length) {
      setEndGame(true);
    }
  }, [correctCards]);

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
