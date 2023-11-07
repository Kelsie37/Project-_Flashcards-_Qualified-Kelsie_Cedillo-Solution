import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Deck from "./Deck";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const history = useHistory();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        setFormData({
          name: loadedDeck.name,
          description: loadedDeck.description,
        });
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDeck({ ...deck, ...formData });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck ? deck.name : "Deck"}
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditDeck;