
import React, { createContext, useContext, useState } from 'react';

const ScrollViewerContext = createContext();

export function ScrollViewerProvider({ children }) {
  const [scrollKey, setScrollKey] = useState(null);
  const [scrollType, setScrollType] = useState(null);

  const openScroll = ({ key, type }) => {
    setScrollKey(key);
    setScrollType(type);
  };

  const closeScroll = () => {
    setScrollKey(null);
    setScrollType(null);
  };

  return (
    <ScrollViewerContext.Provider value={{
      scrollKey,
      scrollType,
      openScroll,
      closeScroll
    }}>
      {children}
    </ScrollViewerContext.Provider>
  );
}

export function useScrollViewer() {
  return useContext(ScrollViewerContext);
}
