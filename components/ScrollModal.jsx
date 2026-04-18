// /components/ScrollModal.jsx
import React, { useEffect, useState } from 'react';
import '../styles/components/environment-overlay.css';

export default function ScrollModal({ type, onClose }) {
  const [scrollContent, setScrollContent] = useState(null);

  useEffect(() => {
    fetch(`/data/scrolls/${type}.json`)
      .then((res) => res.json())
      .then((data) => setScrollContent(data))
      .catch(() => setScrollContent({
        title: `${type} Scroll`,
        body: `No sacred scroll has yet been written for '${type}'.`,
      }));
  }, [type]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="scroll-modal-backdrop" onClick={onClose}>
      <div className="scroll-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{scrollContent?.title || 'Loading...'}</h2>
        <p>{scrollContent?.body || '...'}</p>
      </div>
    </div>
  );
}