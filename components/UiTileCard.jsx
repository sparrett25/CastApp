import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * UiTileCard
 * - Uses a <button> + programmatic navigate so global <a> styles can't interfere.
 * - Props: to, icon (emoji or node), title, sub
 */
export default function UiTileCard({ to, icon, title, sub, className = "" }) {
  const navigate = useNavigate();
  const go = () => navigate(to);

  return (
    <button type="button" onClick={go} className={`ui-navtile-btn ${className}`}>
      <div className="ui-tile">
        <div className="ui-tile-row">
          <div className="ui-tile-icon">{icon}</div>
          <div className="ui-tile-text">
            <div className="ui-tile-title">{title}</div>
            <div className="ui-tile-sub">{sub}</div>
          </div>
        </div>
        <span className="ui-tile-arrow">→</span>
      </div>
    </button>
  );
}
