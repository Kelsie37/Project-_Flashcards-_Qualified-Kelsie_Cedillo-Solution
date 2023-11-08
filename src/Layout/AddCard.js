import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api"; 
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId); // Use the readDeck function
        setDeck(loadedDeck);
      } catch (error) {
        // Handle errors
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck ? deck.name : "Deck"}: Add Card</h2>
      <CardForm
        initialFront={front} 
        initialBack={back} 
        onSave={(newFront, newBack) => {
          createCard(deckId, { front: newFront, back: newBack })
            .then(() => {
              setFront(""); 
              setBack(""); 
            })
            .catch((error) => console.error("Error creating card:", error));
        }}
      />
      <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
        Done
      </button>
    </div>
  );
}

export default AddCard;