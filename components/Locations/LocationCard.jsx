import React from 'react';
import '../../styles/components/Locations/location-card.css';

export default function LocationCard({ item, onExplore }) {
  return (
    <div className="location-card">
      <h3 className="location-card-title">{item.name}</h3>
      <p className="location-card-summary">{item.location_description.slice(0, 120)}...</p>
      <button className="location-card-button" onClick={onExplore}>
        Explore Waters
      </button>
    </div>
  );
}
