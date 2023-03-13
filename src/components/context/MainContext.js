import React, { createContext, useState, useEffect } from 'react';
export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(!isMobile);
    }
  }, []);
  return (
    <MainContext.Provider
      value={{
        showDetails,
        setShowDetails,
        ticketData,
        setTicketData,
        isMobile,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const { Consumer } = MainContext;
