import { useState } from "react";
import { cards } from "../lib/config";
import "./puzzleBoard.css";

export default function Card() {
  const [currentCard, setCurrentCard] = useState();

  return (
    <>
      <section className="board">
        {cards.map((card, index) => (
          <div className="card">
            <img src={card.img} alt={`Image of a ${card.name}`} />
          </div>
        ))}
      </section>
    </>
  );
}
