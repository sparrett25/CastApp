import React from 'react';
import '../../styles/components/catch-entry-list.css';

export default function CatchEntryList({ catches }) {
  return (
    <div className="catch-entry-list">
      {(catches || []).map((c) => (
        <div key={c.id} className="catch-entry-card">
          <div className="catch-header">
            <span className="catch-species">
              {c.species || 'Unknown'} — ⭐ {c.rating}
            </span>
            {c.tone && (
              <span className="catch-tone">
                • {getToneEmoji(c.tone)} {c.tone}
              </span>
            )}
          </div>

          {c.notes && (
            <div className="catch-notes">
              <em>{c.notes}</em>
            </div>
          )}

          {c.tags?.length > 0 && (
            <div className="catch-tags">
              Tags: {c.tags.filter(Boolean).join(', ')}
            </div>
          )}

          {c.reflectionNote && (
            <div className="catch-reflection">
              🪞 <em>{c.reflectionNote}</em>
            </div>
          )}

          <div className="catch-date">
            {new Date(c.date_caught).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function getToneEmoji(tone) {
  switch (tone) {
    case 'Calm': return '🌊';
    case 'Focused': return '🎯';
    case 'Frustrated': return '😣';
    case 'Joyful': return '😊';
    case 'Reflective': return '🪞';
    case 'Grateful': return '🙏';
    default: return '';
  }
}
