import React, { useState, useEffect } from "react";

function CardForm({ onSave, initialFront, initialBack }) {
  const [front, setFront] = useState(initialFront);
  const [back, setBack] = useState(initialBack);

  useEffect(() => {
    setFront(initialFront);
    setBack(initialBack);
  }, [initialFront, initialBack]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(front, back);
  };

  return (
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
    </form>
  );
}

export default CardForm;