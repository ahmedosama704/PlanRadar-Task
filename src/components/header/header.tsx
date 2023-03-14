import React, { useContext, } from 'react'
import { MainContext } from '../context/MainContext';

interface Props { }

function Header(props: Props) {
    const { setModal, setAddNewTicket } = useContext(MainContext);
    return (
        <header>
            <button onClick={() => { setModal(true); setAddNewTicket(true) }}> + Add New Ticket  </button>
        </header>

    )
}

export default Header
