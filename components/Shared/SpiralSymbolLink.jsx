import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/gear-scroll.css';

export default function SpiralSymbolLink({ to }) {
  const navigate = useNavigate();

  return (
    <button className="spiral-symbol" onClick={() => navigate(to)} aria-label="Open Gear Scroll">
      <svg viewBox="0 0 100 100" className="spiral-svg">
        <path d="M50,50 m-35,0 a35,35 0 1,0 70,0 a5,5 0 1,1 -10,0 a25,25 0 1,1 -50,0 a15,15 0 1,0 30,0"
              fill="none" stroke="aqua" strokeWidth="3" />
      </svg>
    </button>
  );
}
