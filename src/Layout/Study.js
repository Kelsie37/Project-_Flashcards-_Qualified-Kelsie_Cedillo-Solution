import React, { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);

  React.useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const deckData = await readDeck(deckId, abortController.signal);
      setDeck(deckData);
    }
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (cardIndex + 1 < deck.cards.length) {
      setCardIndex(cardIndex + 1);
      setIsFlipped(false);
    } else {
        setShowRestartPrompt(true);
    }
  };

  const restartDeck = () => {
      setCardIndex(0);
      setIsFlipped(false);
      setShowRestartPrompt(false);
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  if (showRestartPrompt) {
    if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
        restartDeck();
    } else {
        history.push("/");
    }
  }

  if (deck.cards.length < 3) {
    return (
      <div>
        <h2>{deck.name}</h2>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {deck.cards.length} in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
   Add Cards
    </Link>
      </div>
    );
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">
            {isFlipped ? deck.cards[cardIndex].back : deck.cards[cardIndex].front}
          </p>
          <button onClick={toggleFlip} className="btn btn-secondary">
            Flip
          </button>
          {isFlipped && (
            <button onClick={nextCard} className="btn btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;