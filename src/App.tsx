import React, { useContext } from 'react';
import './styles/globals.scss';
import { getTickets } from './components/constants/ticketsApi';
import { useQuery } from 'react-query';
import VirtualizedList from './components/virtualizedList/virtualizedList';
import TableContent from './components/tableContent/tableContent';
import TicketDetails from './components/ticketDetails/ticketDetails';
import { MainContext } from './components/context/MainContext';
import Header from './components/header/header';
import AddNewModal from './components/addNewModal/addNewModal';
function App() {
    const { addNewTicket, showTicketDetails, } = useContext(MainContext);
    const {
        isLoading,
        data
    } = useQuery('tickets', getTickets);

    return (
        <div className="App">
            {isLoading
                ? (
                    <div className="loader">
                        <div className="loading"> </div>
                    </div>
                )
                : (
                    <div className="ticketsList">
                        <Header />
                        {addNewTicket && <AddNewModal />}
                        {showTicketDetails && <TicketDetails />}
                        <TableContent />
                        <VirtualizedList data={data} />
                    </div>
                )}
        </div>
    );
}

export default App;
