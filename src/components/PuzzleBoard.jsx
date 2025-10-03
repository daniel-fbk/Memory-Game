import { useEffect, useState } from "react";
import { cards } from "../lib/config";
import "./puzzleBoard.css";

export default function Card() {
  const [selectedCards, setSelectedCard] = useState([]);
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
  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const selectCard = (card) => {
    if (selectedCards.length < 2) {
      setSelectedCard([...selectedCards, card]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      if (first.name === second.name) {
        setCorrectCards((prev) => [...prev, ...selectedCards]);
      } else {
        setWrongCards([...selectedCards]);
      }

      const timeout = setTimeout(() => {
        setSelectedCard([]);
        setWrongCards([]);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedCards]);

  const setClass = (card) => {
    if (wrongCards.includes(card)) {
      return "card-wrong";
    } else if (correctCards.includes(card)) {
      return "card-correct";
    } else if (selectedCards.includes(card)) {
      return "card-selected";
    } else {
      return "card-backside";
    }
  };
  let test = wrongCards;
  console.log(test);

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
