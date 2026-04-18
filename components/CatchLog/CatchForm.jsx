import React, { useState } from 'react';
import ToneSelector from '../Tone/ToneSelector';
import ReflectionModal from '../Tone/ReflectionModal';
import '../../styles/components/tone-selector.css';
import '../../styles/components/reflection-modal.css';

export default function CatchForm({ onAddCatch }) {
  const [species, setSpecies] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const [tone, setTone] = useState('');
  const [showReflection, setShowReflection] = useState(false);
  const [pendingCatch, setPendingCatch] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!species || !rating) return;

    const newCatch = {
      species,
      rating: parseInt(rating),
      notes,
      tags: tags.split(',').map(t => t.trim()),
      date_caught: new Date().toISOString(),
      lat: 27.9506,
      lng: -82.4572,
      tone
    };

    setPendingCatch(newCatch);
    setShowReflection(true);
  };

  const handleSaveReflection = (reflectionNote) => {
    const fullCatch = {
      ...pendingCatch,
      reflectionNote
    };

    onAddCatch(fullCatch);
    resetForm();
  };

  const resetForm = () => {
    setSpecies('');
    setRating('');
    setNotes('');
    setTags('');
    setTone('');
    setShowReflection(false);
    setPendingCatch(null);
  };

  return (
    <form onSubmit={handleSubmit} className="catch-form">
      <input
        type="text"
        placeholder="Species (required)"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating (1–5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <ToneSelector tone={tone} setTone={setTone} />
      <button type="submit">Cast Catch</button>

      {showReflection && (
        <ReflectionModal
          onClose={() => setShowReflection(false)}
          onSave={handleSaveReflection}
        />
      )}
    </form>
  );
}
