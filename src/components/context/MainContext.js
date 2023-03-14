import React, { createContext, useState, useEffect } from 'react';
export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [addNewTicket, setAddNewTicket] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [modal, setModal] = useState(false);
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
        ticketData,
        setTicketData,
        isMobile,
        addNewTicket,
        setAddNewTicket,
        showTicketDetails,
        setShowTicketDetails,
        modal,
        setModal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const { Consumer } = MainContext;
