// components/Scrolls/ScrollLink.jsx
import React from 'react';
import { useScrollViewer } from '../../hooks/useScrollViewer';
import '../../styles/components/scroll-link.css';

export default function ScrollLink({ scrollKey, scrollType, label = 'Open Scroll', className = '', onClickFallback }) {
  const ctx = typeof useScrollViewer === 'function' ? useScrollViewer() : null;
  const openScroll = ctx?.openScroll;

  const handleClick = () => {
    if (openScroll) {
      openScroll({ key: scrollKey, type: scrollType });
    } else if (onClickFallback) {
      onClickFallback({ key: scrollKey, type: scrollType });
    } else {
      console.warn('ScrollViewer context not found; no-op for ScrollLink');
    }
  };

  return (
    <button className={`scroll-link ${className}`} onClick={handleClick}>
      📜 {label}
    </button>
  );
}
