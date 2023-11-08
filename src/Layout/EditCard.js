import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api"; 
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  useEffect(() => {
    const loadDeckAndCard = async () => {
      try {
        const loadedDeck = await readDeck(deckId); // Use the readDeck function
        const loadedCard = await readCard(cardId); // Use the readCard function
        setDeck(loadedDeck);
        setCard(loadedCard);
        setFront(loadedCard.front);
        setBack(loadedCard.back);
      } catch (error) {
        // Handle errors
        console.error("Error loading deck or card:", error);
      }
    };

    loadDeckAndCard();
  }, [deckId, cardId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck ? deck.name : "Deck"}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>{deck ? deck.name : "Deck"}: Edit Card {cardId}</h2>
      <CardForm
        initialFront={front}
        initialBack={back}
        onSave={(updatedFront, updatedBack) => {
          updateCard({ ...card, front: updatedFront, back: updatedBack })
            .then(() => history.push(`/decks/${deckId}`))
            .catch((error) => console.error("Error updating card:", error));
        }}
      />
      <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
        Cancel
      </button>
    </div>
  );
}

export default EditCard;