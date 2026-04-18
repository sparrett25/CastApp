// /context/ScrollModalContext.jsx
import React, { createContext, useContext, useState } from 'react';
import ScrollModal from '../components/ScrollModal';

const ScrollModalContext = createContext();

export const ScrollModalProvider = ({ children }) => {
  const [scrollType, setScrollType] = useState(null);

  const openScroll = (type) => setScrollType(type);
  const closeScroll = () => setScrollType(null);

  return (
    <ScrollModalContext.Provider value={{ openScroll }}>
      {children}
      {scrollType && <ScrollModal type={scrollType} onClose={closeScroll} />}
    </ScrollModalContext.Provider>
  );
};

export const useScrollModal = () => useContext(ScrollModalContext);