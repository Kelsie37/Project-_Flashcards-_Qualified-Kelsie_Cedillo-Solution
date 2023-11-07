import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api"; 

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Update the card with new content
      await updateCard({ ...card, front, back }); // Use the updateCard function
      history.push(`/decks/${deckId}`);
    } catch (error) {
      // Handle errors
      console.error("Error updating card:", error);
    }
  };

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
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditCard;