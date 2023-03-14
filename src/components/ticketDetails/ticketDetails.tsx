import React, { useContext, useState } from 'react'
import Styles from './ticketDetails.module.scss'
import { MainContext } from '../context/MainContext';
import EditTicket from './../editTicket/editTicket';
import Modal from './../modal/modal';

interface DataTypes {
    id?: number;
    subject?: string;
    status?: string;
    priority?: string;
    description?: string;
}

const TicketDetails: React.FC = () => {
    const { ticketData, setTicketData, setModal, setShowTicketDetails } = useContext(MainContext);
    const [showEdit, setShowEdit] = useState(false);
    const data: DataTypes = ticketData;
    const priorityBg = data.priority == "High" ? "red" : data.priority == "Medium" ? "orange" : "#00cfb2"

    const handleCloseModal = () => {
        setShowEdit(false);
        setTicketData({});
        setModal(false);
        setShowTicketDetails(false)
    }
    return (
        <Modal>
            {showEdit ? (<EditTicket data={data} handleCloseModal={handleCloseModal} />) : (
                <div>
                    <h2> {data.subject} </h2>
                    <div className={Styles.rowItem}>
                        <div className={Styles.priority}>  Priority : <span style={{ background: priorityBg }}> {data.priority} </span>  </div>
                        <div className={Styles.status}>  Status : {data.status} </div>
                    </div>
                    <p> {data.description} </p>

                    <div className={Styles.buttons}>
                        <button onClick={() => { setShowEdit(true); }}> Edit  </button>
                        <button onClick={handleCloseModal}> Close </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}
export default TicketDetails