import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api"; 
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Study from "./Study";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    loadDecks();
  }, []);

  const getNumberOfCardsInDeck = (deckId) => {
    return decks.reduce((count, deck) => {
      if (deck.id === deckId) {
        return count + deck.cards.length;
      }
      return count;
    }, 0);
  };

  const loadDecks = async () => {
    try {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    } catch (error) {
      // Handle errors
      console.error("Error loading decks:", error);
    }
  };

  const handleDelete = (deck) => {
    const confirmation = window.confirm(
      `Delete this deck? You will not be able to recover it.`
    );
    if (confirmation) {
      deleteDeck(deck.id) // Use the deleteDeck function to delete the deck
        .then(() => {
          loadDecks();
        })
        .catch((error) => {
          // Handle errors
          console.error("Error deleting deck:", error);
        });
    }
  };

  return (
    <div>
      {decks.map((deck) => (
        <div key={deck.id} className="mt-4">
          <div>
            <h3>{deck.name}</h3>
            <p>{`${getNumberOfCardsInDeck(deck.id)} cards`}</p>
          </div>
          <div>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary">
              Study
            </Link>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary ml-2">
              View
            </Link>
            <button
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(deck)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <Switch>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck />
          </Route>
        </Switch>
    </div>
  );
}

export default Home;