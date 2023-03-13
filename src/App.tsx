import React, { useContext } from 'react';
import './styles/globals.scss';
import { getTickets } from './components/constants/ticketsApi';
import { useQuery } from 'react-query';
import VirtualizedList from './components/virtualizedList/virtualizedList';
import TableContent from './components/tableContent/tableContent';
import TicketDetails from './components/ticketDetails/ticketDetails';
import { MainContext } from './components/context/MainContext';
import { useQueryClient } from 'react-query'
function App() {
    const { showDetails } = useContext(MainContext);

    const webQueryClient = useQueryClient();
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

                        {showDetails && <TicketDetails />}
                        <TableContent />
                        <VirtualizedList data={data} />
                    </div>
                )}
        </div>
    );
}

export default App;
