// /components/PinCreationModal.jsx
import React, { useState } from 'react';
import '../styles/components/environment-overlay.css';

export default function PinCreationModal({ latlng, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('catch-location');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      type,
      name,
      coordinates: latlng,
      address: 'Custom pin'
    });
  };

  return (
    <div className="scroll-modal-backdrop" onClick={onCancel}>
      <div className="scroll-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onCancel}>×</button>
        <h2>Create New Pin</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:<br/>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label><br/>
          <label>Type:<br/>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="catch-location">Catch Location</option>
              <option value="fishing-spot">Fishing Spot</option>
              <option value="gear-drop">Gear Drop</option>
            </select>
          </label><br/>
          <button type="submit">Drop Pin</button>
        </form>
      </div>
    </div>
  );
}
