import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api"; 

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newCard = await createCard(deckId, { front, back }); // Use the createCard function
      // Clear the form fields
      setFront("");
      setBack("");
    } catch (error) {
      // Handle errors
      console.error("Error creating card:", error);
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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck ? deck.name : "Deck"}: Add Card</h2>
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
        <button
          className="btn btn-secondary"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default AddCard;