import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api"; 

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
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

  const handleDeleteCard = (cardId) => {
    const confirmation = window.confirm("Delete this card? You will not be able to recover it.");
    if (confirmation) {
      deleteCard(cardId)
        .then(() => {
          // After deleting, remove the card from the displayed cards
          setDeck({
            ...deck,
            cards: deck.cards.filter((card) => card.id !== cardId),
          });
        })
        .catch((error) => {
          console.error("Error deleting card:", error);
        });
    }
  };

  const handleDeleteDeck = () => {
    const confirmation = window.confirm("Delete this deck? You will not be able to recover it.");
    if (confirmation) {
      deleteDeck(deckId)
        .then(() => {
          // Handle successful deletion and navigate to the home screen 
          history.push("/");
        })
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
        Edit
      </Link>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        Study
      </Link>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        Add Cards
      </Link>

      <button className="btn btn-danger" onClick={handleDeleteDeck}>
        Delete
      </button>

      <h3>Cards</h3>
      {deck.cards.map((card) => (
        <div key={card.id} className="card mb-2">
          <div className="card-body">
            <p>{card.front}</p>
            <p>{card.back}</p>
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;