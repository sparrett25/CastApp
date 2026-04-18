import React, { useState } from 'react';

export default function CatchJournal() {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    if (!note) return;
    const newEntry = {
      id: Date.now(),
      note,
      rating,
      tags: tags.split(',').map(t => t.trim())
    };
    setEntries([newEntry, ...entries]);
    setNote('');
    setRating(0);
    setTags('');
  };

  return (
    <div>
      <h1>Catch Journal</h1>
      <textarea
        placeholder="Write about your catch..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <br />
      <label>Rating: </label>
      {[1,2,3,4,5].map(star => (
        <button
          key={star}
          onClick={() => setRating(star)}
          style={{ color: star <= rating ? 'gold' : 'gray' }}
        >★</button>
      ))}
      <br />
      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button onClick={handleSubmit}>Save Entry</button>

      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <p>{entry.note}</p>
            <p>Rating: {'★'.repeat(entry.rating)}</p>
            <p>Tags: {entry.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
