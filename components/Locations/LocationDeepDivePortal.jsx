import React from 'react';
import '../../styles/components/Locations/location-deep-dive.css';

export default function LocationDeepDivePortal({ locationData, onClose }) {
  if (!locationData) return null;

  const {
    name,
    region,
    type,
    length_miles,
    habitat,
    location_description,
    notable_event,
    species,
    gear_recommendations,
    fishing_tips,
    seasonality,
    reflection_prompt,
    whisper
  } = locationData;

  return (
    <div className="location-dive-overlay">
      <div className="location-dive-container">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="location-dive-header">
          <h2 className="location-title">{name}</h2>
          <p className="location-sub">{region} • {type} • {length_miles} mi</p>
        </div>

        <div className="location-section">
          <h3>About This Location</h3>
          <p>{location_description}</p>
        </div>

        <div className="location-section">
          <h3>Environmental History</h3>
          <p>{notable_event}</p>
        </div>

        <div className="location-section">
          <h3>Common Species</h3>
          <ul>{species.map((s, i) => (
            <li key={i}>{s.name} — {s.habitat} — {s.length}</li>
          ))}</ul>
        </div>

        <div className="location-section">
          <h3>Recommended Gear</h3>
          <ul>{gear_recommendations.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </div>

        <div className="location-section">
          <h3>Fishing Tips</h3>
          <ul>{fishing_tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>

        <div className="location-section">
          <h3>Seasonality</h3>
          <p><strong>Prime Months:</strong> {seasonality.prime_months}</p>
          <p><strong>Moon Phase Note:</strong> {seasonality.moon_phase_notes}</p>
        </div>

        <div className="location-section">
          <h3>Reflection Prompt</h3>
          <p><em>{reflection_prompt}</em></p>
        </div>

        <div className="location-section location-whisper">
          <h3>Whisper from the Waters</h3>
          <blockquote>{whisper}</blockquote>
        </div>
      </div>
    </div>
  );
}
